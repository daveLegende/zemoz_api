import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { IArbitreService } from '../../app/module';
import { Arbitre, IArbitreRepository } from '../../domain';
import { ArbitreFactory } from '../arbitre.factory';
import { ArbitreAccountDto, UpdateArbitreDTO } from '../dto';
  
  @Injectable()
  export class ArbitreService implements IArbitreService {
    private readonly logger = new Logger();
    constructor(private arbitresRepository: IArbitreRepository) {}
  
    async fetchAll(): Promise<Arbitre[]> {
      try {
        return await this.arbitresRepository.arbitres.find({
          relations: { matchs: true }
        });
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
  
    async add(data: ArbitreAccountDto): Promise<Arbitre> {
      try {
        const { name } = data;
        const existed = await this.arbitresRepository.arbitres.findOneBy({ name });
        if (existed)
          throw new ConflictException('arbitres already exist');
        return await this.arbitresRepository.arbitres.create(
          await ArbitreFactory.create(data),
        );
      } catch (error) {
        this.logger.error(error.message, 'ERROR::arbitreservice.add');
        throw error;
      }
    }
  
    async edit(data: UpdateArbitreDTO): Promise<Arbitre> {
      try {
        const { id } = data;
        const arbitres = id && (await this.arbitresRepository.arbitres.findOne({
          where: { id: id },
          relations: { matchs: true }
        }));
        if (arbitres) {
          return await this.arbitresRepository.arbitres.update(
            ArbitreFactory.update(arbitres, data),
          );
        }
        throw new NotFoundException();
      } catch (error) {
        this.logger.error(error.message, 'ERROR::arbitreservice.editarbitres');
  
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
  