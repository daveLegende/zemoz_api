import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { MVPFactory } from '../mvp.factory';
import { IMVPService } from '../../../mvp/app/module';
import { IMVPRepository, MVP } from '../../../mvp/domain';
import { MvpAccountDto } from '../dto';
import { IUserRepository } from '../../../user/domain';
import { IMatchRepository } from '../../../match/domain';
import { IPlayerRepository } from '../../../player/domain';
import { MatchEntity } from '../../../match/framework/database/schema/match.entity';
import { TeamPlayerEntity } from '../../../player/framework/database/schema/team-player.entity';
import { MVPEntity } from '../../../mvp/framework/database/schema/mvp.entity';
import { UserEntity } from '../../../user/framework/database/schema/user.entity';
import { DataSource } from 'typeorm';
import { PaginatedResult, PaginationQuery, paginateQuery } from '../../../_shared/domain/pagination';

@Injectable()
export class MVPService implements IMVPService {
  private readonly logger = new Logger();
  constructor(
    private mvpRepository: IMVPRepository,
    private userRepository: IUserRepository,
    private playerRepository: IPlayerRepository,
    private matchRepository: IMatchRepository,
    private dataSource: DataSource,
  ) { }

  async fetchAll(query?: PaginationQuery): Promise<PaginatedResult<MVP>> {
    try {
      return await paginateQuery(this.mvpRepository.mvps, query, {
        relations: {
          user: true,
          match: { tournoi: true },
          inscription: { player: true, team: true },
        },
      });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MvpService.fetchAll');
      throw error;
    }
  }

  async fetchByMatch(matchId: string, query?: PaginationQuery): Promise<PaginatedResult<MVP>> {
    try {
      return await paginateQuery(this.mvpRepository.mvps, query, {
        where: { match: { id: matchId } },
        relations: {
          user: true,
          match: { tournoi: true },
          inscription: { player: true, team: true },
        },
      });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MvpService.fetchByMatch');
      throw error;
    }
  }

  async fetchByTournoi(tournoiId: string, query?: PaginationQuery): Promise<PaginatedResult<MVP>> {
    try {
      return await paginateQuery(this.mvpRepository.mvps, query, {
        where: { match: { tournoi: { id: tournoiId } } },
        relations: {
          user: true,
          match: { tournoi: true },
          inscription: { player: true, team: true },
        },
      });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MvpService.fetchByTournoi');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<MVP> {
    try {
      const mvp = await this.mvpRepository.mvps.findOne({
        where: { id },
        relations: {
          account: true,
          match: { tournoi: true },
          inscription: { player: true, team: true },
        },
      });
      if (mvp) {
        return mvp;
      }
      throw new NotFoundException('Mvp not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MvpService.fetchOne');
      throw error;
    }
  }

  async add(data: MvpAccountDto): Promise<MVP> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { userId, matchId, teamPlayerId, playerId } = data;

      this.logger.log(`Vote MVP reçu : ${JSON.stringify(data)}`);

      // 🔒 Lock pessimiste pour éviter double vote / double débit
      const user = await queryRunner.manager.findOne(UserEntity, {
        where: { id: userId },
        lock: { mode: 'pessimistic_write' },
      });

      const match = await queryRunner.manager.findOne(MatchEntity, {
        where: { id: matchId },
        relations: { home: true, away: true, tournoi: true },
      });

      let inscription: TeamPlayerEntity | null = null;
      if (teamPlayerId) {
        inscription = await queryRunner.manager.findOne(TeamPlayerEntity, {
          where: { id: teamPlayerId },
          relations: { team: true, player: true },
        });
      } else if (playerId && match) {
        // Fallback si playerId fourni au lieu de teamPlayerId
        inscription = await queryRunner.manager.findOne(TeamPlayerEntity, {
          where: [
            { player: { id: playerId }, team: { id: match.home.id } },
            { player: { id: playerId }, team: { id: match.away.id } },
          ],
          relations: { team: true, player: true },
        });
      }

      // ❌ Vérification existence
      if (!user) {
        throw new NotFoundException('Utilisateur introuvable');
      }
      if (!match) {
        throw new NotFoundException('Match introuvable');
      }
      if (!inscription) {
        throw new NotFoundException('Inscription du joueur (TeamPlayer) introuvable');
      }

      // ❌ Vérification que le joueur appartient à une équipe participant à ce match
      const homeTeamId = match.home?.id;
      const awayTeamId = match.away?.id;
      const playerTeamId = inscription.team?.id;

      if (playerTeamId !== homeTeamId && playerTeamId !== awayTeamId) {
        throw new BadRequestException(
          "Le joueur sélectionné n'appartient pas à une équipe participant à ce match",
        );
      }

      // ❌ Vérification solde
      if (user.solde < 100) {
        throw new BadRequestException(
          'Solde insuffisant pour voter (minimum 100 FCFA)',
        );
      }

      // 💸 Débit
      user.solde -= 100;
      await queryRunner.manager.save(UserEntity, user);

      // 🏆 Création MVP
      const mvpData = MVPFactory.create(user as any, match, inscription);
      const mvp = await queryRunner.manager.save(MVPEntity, mvpData);

      // ✅ Commit
      await queryRunner.commitTransaction();

      // 🔄 Retour avec relations
      return await this.mvpRepository.mvps.findOne({
        where: { id: mvp.id },
        relations: {
          account: true,
          match: { tournoi: true },
          inscription: { player: true, team: true },
        },
      });

    } catch (error) {
      // ❌ Rollback
      await queryRunner.rollbackTransaction();

      this.logger.error(error.message, 'ERROR::MvpService.add');
      throw error;

    } finally {
      // 🔚 Libération connexion
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const mvp = await this.mvpRepository.mvps.findOneByID(id);
      if (mvp) {
        return await this.mvpRepository.mvps.remove(mvp).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MvpService.remove');
      return false;
    }
  }
}
