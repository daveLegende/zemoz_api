import { forwardRef, Module } from '@nestjs/common';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { BetRepositoryModule } from '../../../bet/framework/bet.module.repository';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';
import { MatchModule } from '../../../match/adapter/module';
import { AuthApiModule } from '../../../user/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { TournoiCouponRepositoryModule } from '../../../tournoiCoupon/framework/tournoi_coupon.module.repository';
import { TournoiCouponBetRepositoryModule } from '../../../tournoiCouponBet/framework/tournoi_coupon_bet.module.repository';
import { TournoiCouponController } from './tournoi_coupon.controller';
import { ITournoiCouponService } from '../../../tournoiCoupon/app/module';
import { TournoiCouponService } from './tournoi_coupon.service';
import { PlayerRepositoryModule } from '../../../player/framework/database/player.repository.module';


import { TournoiCouponGateway } from './tournoi_coupon.gateway';

@Module({
  imports: [
    TournoiCouponRepositoryModule,
    MatchRepositoryModule,
    PlayerRepositoryModule,
    BetRepositoryModule,
    TournoiCouponBetRepositoryModule,
    MatchRepositoryModule,
    forwardRef(() => MatchModule),
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule,
    AdminAuthApiModule,
  ],
  controllers: [TournoiCouponController],
  providers: [
    { provide: ITournoiCouponService, useClass: TournoiCouponService },
    TournoiCouponGateway,
  ],
  exports: [ITournoiCouponService, TournoiCouponRepositoryModule, TournoiCouponGateway],
})
export class TournoiCouponModule { }
