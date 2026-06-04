import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { IPlayerService } from '../../app/module';
import { IPlayerRepository, Player } from '../../domain';
import { PlayerAccoutDTO, UpdatePlayerDTO } from '../dto';
import { PlayerFactory } from '../player.factory';
import { ITeamRepository } from '../../../team/domain';
import { Express } from 'express';
  
  @Injectable()
  export class PlayerService implements IPlayerService {
    private readonly logger = new Logger();
    constructor(
      private playerRepository: IPlayerRepository,
      private teamRepository: ITeamRepository,
    ) {}
  
    async fetchAll(): Promise<Player[]> {
      try {
        return await this.playerRepository.players.find({
          relations: { team: true },
          withDeleted: true
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::playerService.fetchAll');
        throw error;
      }
    }
  
    async fetchOne(id: string): Promise<Player> {
      try {
        const player = await this.playerRepository.players.findOne({
          where: { id: id },
            relations: { team: true }
        });
        if (player) {
          return player;
        }
        throw new NotFoundException('Player not found');
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.fetchOne');
        throw error;
      }
    }
  
    async search(data: Partial<Player>): Promise<Player> {
      return await this.playerRepository.players.findOneBy({ ...data });
    }
  
    async add(data: PlayerAccoutDTO): Promise<Player> {
      try {
        const { name, team } = data;
        const existed = await this.playerRepository.players.findOne({
          where: { name: name },
            relations: { team: true }
        });
        if (existed)
          throw new ConflictException('Player already exist');

        const equipe = await this.teamRepository.teams.findOneByID(team);
        
        return await this.playerRepository.players.create(
          await PlayerFactory.create(data, equipe),
        );
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.add');
        throw error;
      }
    }
  
    async edit(data: UpdatePlayerDTO): Promise<Player> {
      try {
        const { id, team } = data;
        const player = id && (await this.playerRepository.players.findOne({
          where: { id: id },
            relations: { team: true }
        }));
        const teamExisted = id && (await this.teamRepository.teams.findOne({
          where: { id: team },
        }));
        if (player && teamExisted) {
          return await this.playerRepository.players.update(
            PlayerFactory.update(player, data, teamExisted),
          );
        }
        throw new NotFoundException();
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.editPlayer');
  
        throw error;
      }
    }
  
    async setState(id: string): Promise<boolean> {
      return false;
    }
  
    async remove(id: string): Promise<boolean> {
      try {
        const player = await this.playerRepository.players.findOne({
          where: { id: id },
            relations: { team: true }
        });
        if (player) {
          return await this.playerRepository.players.remove(player).then(() => true);
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.remove');
        return false;
      }
    }
  }
  