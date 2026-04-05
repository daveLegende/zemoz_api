import {
    ConflictException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { IArbitreService } from '../../app/module';
import { Arbitre, IArbitreRepository } from '../../domain';
import { ArbitreFactory } from '../arbitre.factory';
import { ArbitreAccountDto, UpdateArbitreDTO } from '../dto';
import { CloudinaryService } from '../../../shared/infrastructure/cloudinary/cloudinary.service';
import { PaginationOptionsDto } from '../../../_shared/adapter/dto/pagination-options.dto';
import { PaginationResultDto } from '../../../_shared/adapter/dto/pagination-result.dto';
import { Express } from 'express';
import { IFileStorage } from '../../../shared/domain/file-storage.interface';
  
  @Injectable()
  export class ArbitreService implements IArbitreService {
    private readonly logger = new Logger();
    constructor(
      private arbitresRepository: IArbitreRepository,
      @Inject('IFileStorage') private cloudinaryService: IFileStorage,
    ) {}
  
    async fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Arbitre>> {
      try {
        const [arbitres, total] = await this.arbitresRepository.arbitres.findAndCount({
          skip: options.skip,
          take: options.limit,
          relations: { matchs: true },
          order: { name: 'ASC' }
        });
        return new PaginationResultDto(arbitres, total, options.page, options.limit);
      } catch (error) {
        this.logger.error(error.message, 'ERROR::arbitresService.fetchAll');
        throw error;
      }
    }
  
    async fetchOne(id: string): Promise<Arbitre> {
      try {
        const arbitres = await this.arbitresRepository.arbitres.findOne({
          where: { id: id },
          relations: { matchs: true }
        });
        if (arbitres) {
          return arbitres;
        }
        throw new NotFoundException('arbitres not found');
      } catch (error) {
        this.logger.error(error.message, 'ERROR::arbitresService.fetchOne');
        throw error;
      }
    }
  
    async search(data: Partial<Arbitre>): Promise<Arbitre> {
      return await this.arbitresRepository.arbitres.findOneBy({ ...data });
    }
  
    // async add(data: ArbitreAccountDto): Promise<Arbitre> {
    //   try {
    //     const { name } = data;
    //     const existed = await this.arbitresRepository.arbitres.findOneBy({ name });
    //     if (existed)
    //       throw new ConflictException('arbitres already exist');
    //     return await this.arbitresRepository.arbitres.create(
    //       await ArbitreFactory.create(data),
    //     );
    //   } catch (error) {
    //     this.logger.error(error.message, 'ERROR::arbitreservice.add');
    //     throw error;
    //   }
    // }

    async add(data: ArbitreAccountDto, file?: Express.Multer.File): Promise<Arbitre> {
      try {
        const { name } = data;
        const existed = await this.arbitresRepository.arbitres.findOneBy({ name });
        if (existed)
          throw new ConflictException('arbitre already exists');

        // Upload image si fournie
        let avatarUrl: string | undefined;
        if (file) {
          avatarUrl = await this.cloudinaryService.upload(file, 'arbitres');
        }

        // Créer l'arbitre avec l'avatar
        const arbitre = await ArbitreFactory.create({ ...data, avatar: avatarUrl });

        return await this.arbitresRepository.arbitres.create(arbitre);
      } catch (error) {
        this.logger.error(error.message, 'ERROR::arbitreservice.add');
        throw error;
      }
    }
  
    // async edit(data: UpdateArbitreDTO): Promise<Arbitre> {
    //   try {
    //     const { id } = data;
    //     const arbitres = id && (await this.arbitresRepository.arbitres.findOne({
    //       where: { id: id },
    //       relations: { matchs: true }
    //     }));
    //     if (arbitres) {
    //       return await this.arbitresRepository.arbitres.update(
    //         ArbitreFactory.update(arbitres, data),
    //       );
    //     }
    //     throw new NotFoundException();
    //   } catch (error) {
    //     this.logger.error(error.message, 'ERROR::arbitreservice.editarbitres');
  
    //     throw error;
    //   }
    // }

    async edit(data: UpdateArbitreDTO, file?: Express.Multer.File): Promise<Arbitre> {
      try {
        const { id } = data;
        const arbitre = await this.arbitresRepository.arbitres.findOne({
          where: { id },
          relations: { matchs: true },
        });
        if (!arbitre) throw new NotFoundException('Arbitre not found');

        // Upload avatar si fourni
        if (file) {
          const avatarUrl = await this.cloudinaryService.upload(file, 'arbitres');
          data.avatar = avatarUrl; // On met à jour le DTO
        }

        const updated = await ArbitreFactory.update(arbitre, data);
        return await this.arbitresRepository.arbitres.update(updated);
      } catch (error) {
        this.logger.error(error.message, 'ERROR::arbitreservice.edit');
        throw error;
      }
    }
  
    async setState(id: string): Promise<boolean> {
      return false;
    }
  
    async remove(id: string): Promise<boolean> {
      try {
        const arbitres = await this.arbitresRepository.arbitres.findOne({
          where: { id: id },
          relations: { matchs: true }
        });
        if (arbitres) {
          return await this.arbitresRepository.arbitres.remove(arbitres).then(() => true);
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::arbitreservice.remove');
        return false;
      }
    }
  }
  