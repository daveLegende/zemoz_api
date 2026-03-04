import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { InfoAccountDto, UpdateInfoDTO } from '../dto';
import { IInfoService } from '../../../infos/app/module';
import { IInfoRepository, Info } from '../../../infos/domain';
import { InfoFactory } from '../info.factory';
  
  @Injectable()
  export class InfoService implements IInfoService {
    private readonly logger = new Logger();
    constructor(
      private infoRepository: IInfoRepository
    ) {}
  
    async fetchAll(): Promise<Info[]> {
      try {
        return await this.infoRepository.infos.find();
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
  
    async add(data: InfoAccountDto): Promise<Info> {
      try {
        const { title } = data;
        const existed = await this.infoRepository.infos.findOneBy({ title });
        if (existed)
          throw new ConflictException('Info already exist');

        return await this.infoRepository.infos.create(
          await InfoFactory.create(data),
        );
      } catch (error) {
        this.logger.error(error.message, 'ERROR::InfoService.add');
        throw error;
      }
    }
  
    async edit(data: UpdateInfoDTO): Promise<Info> {
      try {
        const { id } = data;
        const info = id && (await this.infoRepository.infos.findOneByID(id));
        if (info) {
          return await this.infoRepository.infos.update(
            InfoFactory.update(info, data),
          );
        }
        throw new NotFoundException();
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
  