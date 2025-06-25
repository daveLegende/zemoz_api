import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { IPrononsticService } from 'src/prononstic/app/module';
import { IPronosRepository, Prononstic } from 'src/prononstic/domain';
import { PrononsticAccoutDTO, UpdatePrononsticDTO } from '../dto';
import { IUserRepository } from 'user/domain';
import { IMatchRepository } from 'src/match/domain';
import { PrononsticFactory } from '../pronos.factory';
  
  @Injectable()
  export class PrononsticService implements IPrononsticService {
    private readonly logger = new Logger();
    constructor(
      private pronosRepository: IPronosRepository,
      private userRepository: IUserRepository,
      private matchRepository: IMatchRepository,

    ) {}
  
    async fetchAll(): Promise<Prononstic[]> {
      try {
        return await this.pronosRepository.pronos.find({
          relations: { match: true, user: true }
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PronosService.fetchAll');
        throw error;
      }
    }
  
    async fetchOne(id: string): Promise<Prononstic> {
      try {
        const pronos = await this.pronosRepository.pronos.findOne(
          {
            where: { id: id },
            relations: { match: true, user: true }
          }
        );
        if (pronos) {
          return pronos;
        }
        throw new NotFoundException('Pronos not found');
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PronoService.fetchOne');
        throw error;
      }
    }
  
    async search(data: Partial<Prononstic>): Promise<Prononstic> {
      return await this.pronosRepository.pronos.findOneBy({ ...data });
    }
  
    async add(data: PrononsticAccoutDTO): Promise<Prononstic> {
      try {
        const { user, match, date, homeScore, awayScore } = data;

        const existUser = await this.userRepository.users.findOneByID(user);
        const existMatch = await this.matchRepository.matchs.findOneByID(match);

        if (!existMatch || !existUser) {
          throw new NotFoundException("User or Match not found");
        }

        const existed = await this.pronosRepository.pronos.findOne({
          where: { user: existUser, match: existMatch }
        });
        if (existed) throw new ConflictException('Prononstic already exist');
        
        const prononstic = await this.pronosRepository.pronos.create(
          await PrononsticFactory.create(data, existUser, existMatch),
        );

        return prononstic;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PronoService.add');
        throw error;
      }
    }
  
    async edit(data: UpdatePrononsticDTO): Promise<Prononstic> {
      try {
        const { id } = data;
        const prono = id && (await this.pronosRepository.pronos.findOne(
          {
            where: { id: id },
            relations: { user: true, match: true }
          }
        ));
        if (prono) {
          return await this.pronosRepository.pronos.update(
            PrononsticFactory.update(prono, data),
          );
        }
        throw new NotFoundException();
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PronoService.editTeam');
  
        throw error;
      }
    }
  
    async setState(id: string): Promise<boolean> {
      return false;
    }
  
    async remove(id: string): Promise<boolean> {
      try {
        const pronos = await this.pronosRepository.pronos.findOne(
          {
            where: { id: id },
            relations: { user: true, match: true }
          }
        );
        if (pronos) {
          return await this.pronosRepository.pronos.remove(pronos).then(() => true);
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PronoService.remove');
        return false;
      }
    }
  }
  