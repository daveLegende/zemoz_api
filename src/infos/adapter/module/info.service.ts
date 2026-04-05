import {
    ConflictException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { InfoAccountDto, UpdateInfoDTO } from '../dto';
import { IInfoService } from '../../../infos/app/module';
import { IInfoRepository, Info } from '../../../infos/domain';
import { InfoFactory } from '../info.factory';
import { Express } from 'express';
import { IFileStorage } from '../../../shared/domain/file-storage.interface';
import { PaginationOptionsDto } from '../../../_shared/adapter/dto/pagination-options.dto';
import { PaginationResultDto } from '../../../_shared/adapter/dto/pagination-result.dto';

  @Injectable()
  export class InfoService implements IInfoService {
    private readonly logger = new Logger();
    constructor(
      private infoRepository: IInfoRepository,
      @Inject('IFileStorage') private cloudinaryService: IFileStorage,
    ) {}
  
    async fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Info>> {
      try {
        const [infos, total] = await this.infoRepository.infos.findAndCount({
          skip: options.skip,
          take: options.limit,
          order: { createdAt: 'DESC' }
        });
        return new PaginationResultDto(infos, total, options.page, options.limit);
      } catch (error) {
        this.logger.error(error.message, 'ERROR::InfoService.fetchAll');
        throw error;
      }
    }
  
    async fetchOne(id: string): Promise<Info> {
      try {
        const Info = await this.infoRepository.infos.findOneByID(id);
        if (Info) {
          return Info;
        }
        throw new NotFoundException('Info not found');
      } catch (error) {
        this.logger.error(error.message, 'ERROR::InfoService.fetchOne');
        throw error;
      }
    }
  
    async search(data: Partial<Info>): Promise<Info> {
      // const Info = new Info()
      return await this.infoRepository.infos.findOneBy({ ...data });
    }
  
    // async add(data: InfoAccountDto): Promise<Info> {
    //   try {
    //     const { title } = data;
    //     const existed = await this.infoRepository.infos.findOneBy({ title });
    //     if (existed)
    //       throw new ConflictException('Info already exist');

    //     return await this.infoRepository.infos.create(
    //       await InfoFactory.create(data),
    //     );
    //   } catch (error) {
    //     this.logger.error(error.message, 'ERROR::InfoService.add');
    //     throw error;
    //   }
    // }
  
    // async edit(data: UpdateInfoDTO): Promise<Info> {
    //   try {
    //     const { id } = data;
    //     const info = id && (await this.infoRepository.infos.findOneByID(id));
    //     if (info) {
    //       return await this.infoRepository.infos.update(
    //         InfoFactory.update(info, data),
    //       );
    //     }
    //     throw new NotFoundException();
    //   } catch (error) {
    //     this.logger.error(error.message, 'ERROR::InfoService.editInfo');
  
    //     throw error;
    //   }
    // }


    async add(data: InfoAccountDto, file?: Express.Multer.File): Promise<Info> {
    try {
      const existed = await this.infoRepository.infos.findOneBy({ title: data.title });
      if (existed) throw new ConflictException('Info already exist');

      let imageUrl = null;
      // Upload de l'image si fichier présent
      if (file) {
        imageUrl = await this.cloudinaryService.upload(file, 'infos');
      }

      return await this.infoRepository.infos.create(await InfoFactory.create({...data, image: imageUrl}));
    } catch (error) {
      this.logger.error(error.message, 'ERROR::InfoService.add');
      throw error;
    }
  }

  async edit(data: UpdateInfoDTO, file?: Express.Multer.File): Promise<Info> {
    try {
      const info = await this.infoRepository.infos.findOneByID(data.id);
      if (!info) throw new NotFoundException('Info not found');

      let imageUrl = null;
      if (file) {
        imageUrl = await this.cloudinaryService.upload(file, 'infos');
      }

      return await this.infoRepository.infos.update(InfoFactory.update(info, {...data, image: imageUrl}));
    } catch (error) {
      this.logger.error(error.message, 'ERROR::InfoService.editInfo');
      throw error;
    }
  }
  
    async setState(id: string): Promise<boolean> {
      return false;
    }
  
    async remove(id: string): Promise<boolean> {
      try {
        const info = await this.infoRepository.infos.findOneByID(id);
        if (info) {
          return await this.infoRepository.infos.remove(info).then(() => true);
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::InfoService.remove');
        return false;
      }
    }
  }
  