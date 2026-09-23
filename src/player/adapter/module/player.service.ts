import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { IPlayerService } from '../../app/module';
import { IPlayerRepository, ITeamPlayerRepository, Player, TeamPlayer } from '../../domain';
import { PlayerAccoutDTO, TeamPlayerInputDTO, UpdatePlayerDTO, UpdateTeamPlayerDTO } from '../dto';
import { PlayerFactory } from '../player.factory';
import { TeamPlayerFactory } from '../team-player.factory';
import { ITeamRepository } from '../../../team/domain';
import { PaginatedResult, PaginationQuery, paginateQuery } from '../../../_shared/domain/pagination';
import { DataSource } from 'typeorm';
import { PlayerEntity } from '../../framework/database/schema/player.entity';
import { TeamPlayerEntity } from '../../framework/database/schema/team-player.entity';
import { Express } from 'express';

  @Injectable()
  export class PlayerService implements IPlayerService {
    private readonly logger = new Logger();
    constructor(
      private playerRepository: IPlayerRepository,
      private teamPlayerRepository: ITeamPlayerRepository,
      private teamRepository: ITeamRepository,
      private dataSource: DataSource,
    ) {}

    async fetchAll(query?: PaginationQuery): Promise<PaginatedResult<Player>> {
      try {
        return await paginateQuery(this.playerRepository.players, query, {
          relations: { inscriptions: { team: { tournoi: true } } },
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
          relations: { inscriptions: { team: { tournoi: true } } },
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

    async fetchByTournoi(tournoiId: string): Promise<TeamPlayer[]> {
      try {
        return await this.teamPlayerRepository.inscriptions.find({
          where: { team: { tournoi: { id: tournoiId } } },
          relations: { player: true, team: { tournoi: true } },
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.fetchByTournoi');
        throw error;
      }
    }

    async fetchPlayerHistory(playerId: string): Promise<TeamPlayer[]> {
      try {
        const player = await this.playerRepository.players.findOneBy({ id: playerId });
        if (!player) {
          throw new NotFoundException('Player not found');
        }
        return await this.teamPlayerRepository.inscriptions.find({
          where: { player: { id: playerId } },
          relations: { player: true, team: { tournoi: true } },
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.fetchPlayerHistory');
        throw error;
      }
    }

    async search(data: Partial<Player>): Promise<Player> {
      return await this.playerRepository.players.findOneBy({ ...data });
    }

    async add(data: PlayerAccoutDTO, file?: Express.Multer.File): Promise<Player> {
      try {
        const { name, phone, team } = data;
        const equipe = await this.teamRepository.teams.findOne({
          where: { id: team },
          relations: { tournoi: true },
        });
        if (!equipe) {
          throw new NotFoundException('Équipe introuvable');
        }

        let existed: Player;
        if (phone) {
          existed = await this.playerRepository.players.findOne({
            where: { name, phone },
          });
        } else {
          this.logger.warn(
            `Recherche du joueur "${name}" par nom seul (téléphone non fourni)`,
          );
          existed = await this.playerRepository.players.findOne({
            where: { name },
          });
        }

        if (existed) {
          const already = await this.teamPlayerRepository.inscriptions.findOne({
            where: { player: { id: existed.id }, team: { id: equipe.id } },
          });
          if (already) {
            throw new ConflictException('Le joueur est déjà inscrit dans cette équipe');
          }
        }

        return await this.dataSource.transaction(async (manager) => {
          let player = existed;
          if (!player) {
            const playerData = await PlayerFactory.create(data);
            if (file) {
              playerData.avatar = file.originalname; // sera remplacé par URL Cloudinary si besoin
            }
            player = await manager.save(
              PlayerEntity,
              playerData,
            );
          }

          const inscription = TeamPlayerFactory.create(player, equipe, data);
          await manager.save(TeamPlayerEntity, inscription);

          return manager.findOne(PlayerEntity, {
            where: { id: player.id },
            relations: { inscriptions: { team: { tournoi: true } } },
          });
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.add');
        throw error;
      }
    }

    async addInscription(playerId: string, data: TeamPlayerInputDTO): Promise<TeamPlayer> {
      try {
        const player = await this.playerRepository.players.findOne({
          where: { id: playerId },
        });
        if (!player) {
          throw new NotFoundException('Player not found');
        }

        const equipe = await this.teamRepository.teams.findOne({
          where: { id: data.teamId },
          relations: { tournoi: true },
        });
        if (!equipe) {
          throw new NotFoundException('Équipe introuvable');
        }

        const already = await this.teamPlayerRepository.inscriptions.findOne({
          where: { player: { id: player.id }, team: { id: equipe.id } },
        });
        if (already) {
          throw new ConflictException('Le joueur est déjà inscrit dans cette équipe');
        }

        const saved = await this.teamPlayerRepository.inscriptions.create(
          TeamPlayerFactory.create(player, equipe, data),
        );

        // Recharger avec les relations pour retourner un objet complet (team.tournoi inclus)
        return await this.teamPlayerRepository.inscriptions.findOne({
          where: { id: (saved as any).id },
          relations: { player: true, team: { tournoi: true } },
        });
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.addInscription');
        throw error;
      }
    }

    async edit(data: UpdatePlayerDTO, file?: Express.Multer.File): Promise<Player> {
      return this.editPlayer(data, file);
    }

    async editPlayer(data: UpdatePlayerDTO, file?: Express.Multer.File): Promise<Player> {
      try {
        const { id } = data;
        const player = id && (await this.playerRepository.players.findOne({
          where: { id: id },
          relations: { inscriptions: { team: true } },
        }));
        if (player) {
          const updated = PlayerFactory.update(player, data);
          if (file) {
            updated.avatar = file.originalname; // sera remplacé par URL Cloudinary si besoin
          }
          return await this.playerRepository.players.update(updated);
        }
        throw new NotFoundException();
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.editPlayer');
        throw error;
      }
    }

    async editInscription(data: UpdateTeamPlayerDTO): Promise<TeamPlayer> {
      try {
        const inscription = await this.teamPlayerRepository.inscriptions.findOne({
          where: { id: data.id },
          relations: { player: true, team: { tournoi: true } },
        });
        if (!inscription) {
          throw new NotFoundException('Inscription introuvable');
        }
        return await this.teamPlayerRepository.inscriptions.update(
          TeamPlayerFactory.update(inscription, data),
        );
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.editInscription');
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
          relations: { inscriptions: true },
        });
        if (!player) {
          return false;
        }
        if (player.inscriptions?.length) {
          throw new ConflictException(
            'Le joueur a encore des inscriptions actives. Supprimez d\'abord les inscriptions.',
          );
        }
        return await this.playerRepository.players.remove(player).then(() => true);
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.remove');
        throw error;
      }
    }

    async removeInscription(inscriptionId: string): Promise<boolean> {
      try {
        const inscription = await this.teamPlayerRepository.inscriptions.findOne({
          where: { id: inscriptionId },
          relations: { player: true, team: true },
        });
        if (!inscription) {
          return false;
        }
        await this.teamPlayerRepository.inscriptions.remove(inscription);
        return true;
      } catch (error) {
        this.logger.error(error.message, 'ERROR::PlayerService.removeInscription');
        return false;
      }
    }
  }