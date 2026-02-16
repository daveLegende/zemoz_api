import { Module } from '@nestjs/common';
import { TournoiCouponBetService } from './tournoi_coupon_bet.service';
import { TournoiCouponBetController } from '.';
import { BetRepositoryModule } from 'src/bet/framework/bet.module.repository';
import { TournoiCouponBetRepositoryModule } from 'src/tournoiCouponBet/framework/tournoi_coupon_bet.module.repository';
import { TournoiCouponRepositoryModule } from 'src/tournoiCoupon/framework/tournoi_coupon.module.repository';
import { AuthApiModule } from 'user/framework/API';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { MatchRepositoryModule } from 'src/match/framework/database/match.repository.module';
import { ITournoiCouponBetService } from 'src/tournoiCouponBet/app/module';


@Module({
  imports: [
    TournoiCouponBetRepositoryModule,
    TournoiCouponRepositoryModule,
    BetRepositoryModule,
    UserRepositoryModule,
    MatchRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule,
    AdminAuthApiModule,
  ],
  controllers: [TournoiCouponBetController],
  providers: [{ provide: ITournoiCouponBetService, useClass: TournoiCouponBetService }],
  exports: [ITournoiCouponBetService, TournoiCouponBetRepositoryModule],
})
export class TournoiCouponBetModule { }
