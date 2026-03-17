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
import { PlayerEntity } from '../../../player/framework/database/schema/player.entity';
import { MVPEntity } from '../../../mvp/framework/database/schema/mvp.entity';
import { UserEntity } from '../../../user/framework/database/schema/user.entity';
import { DataSource } from 'typeorm';

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

  async fetchAll(): Promise<MVP[]> {
    try {
      return await this.mvpRepository.mvps.find(
        {
          relations: {
            user: true,
            player: true,
          },
        }
      );
    } catch (error) {
      this.logger.error(error.message, 'ERROR::MvpService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<MVP> {
    try {
      const mvp = await this.mvpRepository.mvps.findOneByID(id);
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
      const { userId, playerId } = data;

      console.log('Données reçues :', data);

      // 🔒 Lock pessimiste pour éviter double vote / double débit
      const user = await queryRunner.manager.findOne(UserEntity, {
        where: { id: userId },
        lock: { mode: 'pessimistic_write' },
      });

      const player = await queryRunner.manager.findOne(PlayerEntity, {
        where: { id: playerId },
      });

      // ❌ Vérification existence
      if (!user || !player) {
        throw new NotFoundException('Utilisateur ou joueur introuvable');
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

      // 🏆 Création MVP (factory sync uniquement)
      const mvpData = MVPFactory.create(user, player);

      const mvp = await queryRunner.manager.save(MVPEntity, mvpData);

      // ✅ Commit
      await queryRunner.commitTransaction();

      // 🔄 Retour avec relations
      return await this.mvpRepository.mvps.findOne({
        where: { id: mvp.id },
        relations: {
          user: true,
          player: true,
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
      this.logger.error(error.message, 'ERROR::OtpService.remove');
      return false;
    }
  }
}
