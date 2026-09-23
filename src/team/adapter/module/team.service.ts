import {
    ConflictException,
    Inject,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { ITeamService } from '../../app/module';
import { ITeamRepository, Team } from '../../domain';
import { TeamAccoutDTO, UpdateTeamDTO } from '../dto';
import { TeamFactory } from '../team.factory';
import { PlayerFactory } from '../../../player/adapter/player.factory';
import { PlayerAccoutDTO } from '../../../player/adapter/dto';
import { IPlayerRepository, ITeamPlayerRepository } from '../../../player/domain';
import { TeamPlayerFactory } from '../../../player/adapter/team-player.factory';
import { IFileStorage } from '../../../shared/domain/file-storage.interface';
import { Express } from 'express';
import { PaginatedResult, PaginationQuery, paginateQuery } from '../../../_shared/domain/pagination';


  @Injectable()
  export class TeamService implements ITeamService {
    private readonly logger = new Logger();
    constructor(
      private teamRepository: ITeamRepository,
      private playerRepository: IPlayerRepository,
      private teamPlayerRepository: ITeamPlayerRepository,
      @Inject('IFileStorage') private cloudinaryService: IFileStorage,
    ) {}
  
    async fetchAll(query?: PaginationQuery, tournoiId?: string): Promise<PaginatedResult<Team>> {
      try {
        const where = tournoiId ? { tournoi: { id: tournoiId } } : {};
        return await paginateQuery(this.teamRepository.teams, query, {
          where,
          relations: { inscriptions: { player: true }, poule: true },
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TeamService.fetchAll');
        throw error;
      }
    }
  
    async fetchOne(id: string, tournoiId?: string): Promise<Team> {
      try {
        const where: any = { id: id };
        if (tournoiId) where.tournoi = { id: tournoiId };
        const team = await this.teamRepository.teams.findOne({
          where,
          relations: { poule: true, inscriptions: { player: true } },
        });
        if (team) {
          return TeamFactory.getTeam(team);
        }
        throw new NotFoundException('Team not found');
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TeamService.fetchOne');
        throw error;
      }
    }
  
    async search(data: Partial<Team>, tournoiId?: string): Promise<Team> {
      const where: any = { ...data };
      if (tournoiId) where.tournoi = { id: tournoiId };
      return await this.teamRepository.teams.findOne({ where });
    }
  
    async add(data: TeamAccoutDTO, file?: Express.Multer.File, tournoiId?: string): Promise<Team> {
      try {
        let logoUrl: string | undefined;
        if (file) {
          logoUrl = await this.cloudinaryService.upload(file, 'teams');
        }

        const findWhere: any = { name: data.name };
        if (tournoiId) findWhere.tournoi = { id: tournoiId };
        const existed = await this.teamRepository.teams.findOneBy(findWhere);
        if (existed) throw new ConflictException('Team already exist');

        const team = await this.teamRepository.teams.create(await TeamFactory.create({...data, logo: logoUrl}));
        if (tournoiId) {
          team.tournoi = { id: tournoiId } as any;
          await this.teamRepository.teams.update(team);
        }

        if (data.joueurs && data.joueurs.length > 0) {
          for (let joueur of data.joueurs) {
            const playerDTO = new PlayerAccoutDTO();
            Object.assign(playerDTO, joueur);
            playerDTO.team = team.id;

            let player = playerDTO.phone
              ? await this.playerRepository.players.findOne({
                  where: { name: playerDTO.name, phone: playerDTO.phone },
                })
              : await this.playerRepository.players.findOne({
                  where: { name: playerDTO.name },
                });

            if (!player) {
              player = await this.playerRepository.players.create(
                await PlayerFactory.create(playerDTO),
              );
            }

            const already = await this.teamPlayerRepository.inscriptions.findOne({
              where: { player: { id: player.id }, team: { id: team.id } },
            });
            if (!already) {
              await this.teamPlayerRepository.inscriptions.create(
                TeamPlayerFactory.create(player, team, playerDTO),
              );
            }
          }
        }

        return team;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TeamService.add');
        throw error;
      }
    }
  
    async edit(data: UpdateTeamDTO, file?: Express.Multer.File, tournoiId?: string): Promise<Team> {
      try {
        const where: any = { id: data.id };
        if (tournoiId) where.tournoi = { id: tournoiId };
        const team = await this.teamRepository.teams.findOne({
          where,
          relations: { poule: true, inscriptions: { player: true } },
        });
        if (!team) throw new NotFoundException();

        let logoUrl: string | undefined;
        if (file) {
          logoUrl = await this.cloudinaryService.upload(file, 'teams');
        }

        return await this.teamRepository.teams.update(TeamFactory.update(team, { ...data, logo: logoUrl }));
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TeamService.editTeam');
        throw error;
      }
    }
  
    async setState(id: string, tournoiId?: string): Promise<boolean> {
      return false;
    }
  
    async remove(id: string, tournoiId?: string): Promise<boolean> {
      try {
        const where: any = { id: id };
        if (tournoiId) where.tournoi = { id: tournoiId };
        const Team = await this.teamRepository.teams.findOne({
          where,
          relations: { poule: true, inscriptions: { player: true } },
          order: { createdAt: 'ASC' }
        });
        if (Team) {
          return await this.teamRepository.teams.remove(Team).then(() => true);
        }
        return false;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::TeamService.remove');
        return false;
      }
    }
  }