import { forwardRef, Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { IMatchService } from 'src/match/app/module';
import { MatchService } from './match.service';
import { MatchRepositoryModule } from 'src/match/framework/database/match.repository.module';
import { ArbitreRepositoryModule } from 'src/arbitre/framework/database/arbitre.repository.module';
import { TeamRepositoryModule } from 'src/team/framework/database/team.repository.module';
import { PouleRepositoryModule } from 'src/poule/framework/database/poule.repository.module';
import { MatchGateway } from './match.gateway';
import { PlayerRepositoryModule } from 'src/player/framework/database/player.repository.module';
import { MatchEventRepositoryModule } from 'src/matchEvents/framework/database/match.event.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { AuthApiModule } from 'user/framework/API';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { CouponModule } from 'src/coupon/adapter/module';
import { CouponRepositoryModule } from 'src/coupon/framework/coupon.module.repository';
import { ParisRepositoryModule } from 'src/paris/framework/paris.module.repository';
import { ParisModule } from 'src/paris/adapter/module';
import { UserModule } from 'user/adapter/module/user';
import { EntityManager } from 'typeorm';


@Module({
  imports: [
    MatchRepositoryModule, 
    ArbitreRepositoryModule, 
    TeamRepositoryModule, 
    PouleRepositoryModule, 
    PlayerRepositoryModule,
    MatchEventRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
    CouponRepositoryModule,
    ParisRepositoryModule,
    UserRepositoryModule,
    ParisModule,
    UserModule,
    EntityManager,
    ParisRepositoryModule,
    CouponModule,
  ],
  controllers: [MatchController],
  providers: [MatchGateway, { provide: IMatchService, useClass: MatchService }],
  exports: [IMatchService, MatchRepositoryModule, MatchGateway],
})
export class MatchModule {}
