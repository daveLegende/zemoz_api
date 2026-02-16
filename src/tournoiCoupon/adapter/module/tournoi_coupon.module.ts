import { forwardRef, Module } from '@nestjs/common';
import { ICouponService } from 'src/coupon/app/module';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { BetRepositoryModule } from 'src/bet/framework/bet.module.repository';
import { MatchRepositoryModule } from 'src/match/framework/database/match.repository.module';
import { MatchModule } from 'src/match/adapter/module';
import { AuthApiModule } from 'user/framework/API';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { CouponService } from 'src/coupon/adapter/module';
import { TournoiCouponRepositoryModule } from 'src/tournoiCoupon/framework/tournoi_coupon.module.repository';
import { TournoiCouponBetRepositoryModule } from 'src/tournoiCouponBet/framework/tournoi_coupon_bet.module.repository';
import { TournoiCouponController } from './tournoi_coupon.controller';
import { ITournoiCouponService } from 'src/tournoiCoupon/app/module';
import { TournoiCouponService } from './tournoi_coupon.service';
import { PlayerRepositoryModule } from 'src/player/framework/database/player.repository.module';


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
  providers: [{ provide: ITournoiCouponService, useClass: TournoiCouponService }],
  exports: [ITournoiCouponService, TournoiCouponRepositoryModule],
})
export class TournoiCouponModule { }
