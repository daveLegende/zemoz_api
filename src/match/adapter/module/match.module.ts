import { forwardRef, Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { IMatchService } from '../../../match/app/module';
import { MatchService } from './match.service';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';
import { ArbitreRepositoryModule } from '../../../arbitre/framework/database/arbitre.repository.module';
import { TeamRepositoryModule } from '../../../team/framework/database/team.repository.module';
import { PouleRepositoryModule } from '../../../poule/framework/database/poule.repository.module';
import { MatchGateway } from './match.gateway';
import { PlayerRepositoryModule } from '../../../player/framework/database/player.repository.module';
import { MatchEventRepositoryModule } from '../../../matchEvents/framework/database/match.event.repository.module';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { AuthApiModule } from '../../../user/framework/API';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { CouponRepositoryModule } from '../../../coupon/framework/coupon.module.repository';
import { ParisRepositoryModule } from '../../../paris/framework/paris.module.repository';
import { ParisModule } from '../../../paris/adapter/module';
import { UserModule } from '../../../user/adapter/module/user';
import { EntityManager } from 'typeorm';
import { CouponBetRepositoryModule } from '../../../couponBet/framework/coupon.module.repository';
import { CouponBetModule } from '../../../couponBet/adapter/module';
import { CouponModule } from '../../../coupon/adapter/module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'payout-queue' }),
    MatchRepositoryModule,
    ArbitreRepositoryModule,
    TeamRepositoryModule,
    PouleRepositoryModule,
    PlayerRepositoryModule,
    MatchEventRepositoryModule,
    CouponRepositoryModule,
    CouponBetRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule,
    AdminAuthApiModule,
    CouponRepositoryModule,
    ParisRepositoryModule,
    ParisModule,
    UserModule,
    EntityManager,
    CouponBetModule,
    CouponModule,
  ],
  controllers: [MatchController],
  providers: [MatchGateway, { provide: IMatchService, useClass: MatchService }],
  exports: [IMatchService, MatchRepositoryModule, MatchGateway],
})
export class MatchModule {}
