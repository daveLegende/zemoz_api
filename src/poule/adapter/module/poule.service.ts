import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { IPouleService } from 'src/poule/app/module';
import { IPouleRepository, Poule } from 'src/poule/domain';
import { PouleFactory } from '../poule.factory';
import { PouleAccountDto, UpdatePouleDTO } from '../dto';
import { ITeamRepository } from 'src/team/domain';
  
  @Injectable()
  export class PouleService implements IPouleService {
    private readonly logger = new Logger();
    constructor(
      private pouleRepository: IPouleRepository,
      private teamRepository: ITeamRepository
    ) {}
  
    async fetchAll(): Promise<Poule[]> {
      try {
        return await this.pouleRepository.poules.find({
          relations: {
            equipes: true
          }
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PouleService.fetchAll');
        throw error;
      }
    }
  
    async fetchOne(id: string): Promise<Poule> {
      try {
        const poule = await this.pouleRepository.poules.findOneByID(id);
        if (poule) {
          return poule;
        }
        throw new NotFoundException('Poule not found');
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PouleService.fetchOne');
        throw error;
      }
    }
  
    async search(data: Partial<Poule>): Promise<Poule> {
      // const poule = new Poule()
      return await this.pouleRepository.poules.findOneBy({ ...data });
    }
  
    async add(data: PouleAccountDto): Promise<Poule> {
      try {
        const { name, equipes } = data;
        const existed = await this.pouleRepository.poules.findOneBy({ name });
        if (existed)
          throw new ConflictException('Poule already exist');

        const team = await this.teamRepository.teams.findByIds(equipes);

        return await this.pouleRepository.poules.create(
          await PouleFactory.create(data, team),
        );
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PouleService.add');
        throw error;
      }
    }
  
    async edit(data: UpdatePouleDTO): Promise<Poule> {
      try {
        const { id } = data;
        const poule = id && (await this.pouleRepository.poules.findOneByID(id));
        if (poule) {
          return await this.pouleRepository.poules.update(
            PouleFactory.update(poule, data),
          );
        }
        throw new NotFoundException();
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PouleService.editPoule');
  
        throw error;
      }
    }
  
    async setState(id: string): Promise<boolean> {
      return false;
    }
  
    async remove(id: string): Promise<boolean> {
      try {
        const poule = await this.pouleRepository.poules.findOneByID(id);
        if (poule) {
          return await this.pouleRepository.poules.remove(poule).then(() => true);
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PouleService.remove');
        return false;
      }
    }
  }
  