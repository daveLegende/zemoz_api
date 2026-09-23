import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
    BadRequestException,
  } from '@nestjs/common';
import { IPouleService } from '../../app/module';
import { IPouleRepository, Poule } from '../../domain';
import { PouleFactory } from '../poule.factory';
import { PouleAccountDto, UpdatePouleDTO } from '../dto';
import { ITeamRepository } from '../../../team/domain';
import { PaginatedResult, PaginationQuery, paginateQuery } from '../../../_shared/domain/pagination';
  
  @Injectable()
  export class PouleService implements IPouleService {
    private readonly logger = new Logger();
    constructor(
      private pouleRepository: IPouleRepository,
      private teamRepository: ITeamRepository
    ) {}
  
    async fetchAll(query?: PaginationQuery, tournoiId?: string): Promise<PaginatedResult<Poule>> {
      try {
        const where = tournoiId ? { tournoi: { id: tournoiId } } : {};
        return await paginateQuery(this.pouleRepository.poules, query, {
          where,
          relations: {
            equipes: true
          }
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PouleService.fetchAll');
        throw error;
      }
    }
  
    async fetchOne(id: string, tournoiId?: string): Promise<Poule> {
      try {
        const where: any = { id };
        if (tournoiId) where.tournoi = { id: tournoiId };
        const poule = await this.pouleRepository.poules.findOne({
          where,
          relations: { equipes: true }
        });
        if (poule) {
          return poule;
        }
        throw new NotFoundException('Poule not found');
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PouleService.fetchOne');
        throw error;
      }
    }
  
    async search(data: Partial<Poule>, tournoiId?: string): Promise<Poule> {
      const where: any = { ...data };
      if (tournoiId) where.tournoi = { id: tournoiId };
      return await this.pouleRepository.poules.findOne({ where });
    }
  
    async add(data: PouleAccountDto, tournoiId?: string): Promise<Poule> {
      try {
        const { name, equipes } = data;
        const findWhere: any = { name };
        if (tournoiId) findWhere.tournoi = { id: tournoiId };
        const existed = await this.pouleRepository.poules.findOne({ where: findWhere });
        if (existed)
          throw new ConflictException('Poule already exist in this tournament');

        // Only teams from this tournament if tournoiId specified
        const teamWhere = tournoiId ? equipes.map(id => ({ id, tournoi: { id: tournoiId } })) : equipes.map(id => ({ id }));
        const teams = await this.teamRepository.teams.find({
          where: teamWhere,
        });

        if (teams.length !== equipes.length) {
          throw new BadRequestException('One or more teams do not belong to this tournament');
        }

        const poule = await this.pouleRepository.poules.create(
          await PouleFactory.create(data, teams),
        );
        if (tournoiId) {
          poule.tournoi = { id: tournoiId } as any;
          await this.pouleRepository.poules.update(poule);
        }
        return poule;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PouleService.add');
        throw error;
      }
    }
  
    async edit(data: UpdatePouleDTO, tournoiId?: string): Promise<Poule> {
      try {
        const { id } = data;
        const where: any = { id };
        if (tournoiId) where.tournoi = { id: tournoiId };
        const poule = await this.pouleRepository.poules.findOne({ where });
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
  
    async setState(id: string, tournoiId?: string): Promise<boolean> {
      return false;
    }
  
    async remove(id: string, tournoiId?: string): Promise<boolean> {
      try {
        const where: any = { id };
        if (tournoiId) where.tournoi = { id: tournoiId };
        const poule = await this.pouleRepository.poules.findOne({ where });
        
        if (poule) {
          await this.pouleRepository.poules.remove(poule);
          return true;
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PouleService.remove');
        return false;
      }
    }
  }