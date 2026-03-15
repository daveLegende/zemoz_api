import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { MVPFactory } from '../MVP.factory';
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
            match: true,
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
      const { userId, playerId, matchId } = data;

      const user = await queryRunner.manager.findOne(UserEntity, { where: { id: userId } });
      const player = await queryRunner.manager.findOne(PlayerEntity, { where: { id: playerId } });
      const match = await queryRunner.manager.findOne(MatchEntity, { where: { id: matchId } });

      if (!user || !player || !match) {
        throw new NotFoundException('User, player or match not found');
      }

      if (user.solde < 100) {
        throw new BadRequestException('Solde insuffisant pour voter');
      }

      // Débit du solde
      user.solde -= 100;
      await queryRunner.manager.save(user);

      // Création du vote
      const mvp = await MVPFactory.create(user, player, match);
      await queryRunner.manager.save(MVPEntity, mvp);

      await queryRunner.commitTransaction();

      return mvp;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error.message, 'ERROR::MvpService.add');
      throw error;
    } finally {
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
