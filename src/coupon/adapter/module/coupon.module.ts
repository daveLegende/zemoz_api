import { Module } from '@nestjs/common';
import { ICouponService } from 'src/coupon/app/module';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { CouponService } from './coupon.service';
import { CouponController } from '.';
import { CouponRepositoryModule } from 'src/coupon/framework/coupon.module.repository';
import { BetRepositoryModule } from 'src/bet/framework/bet.module.repository';
import { CouponBetRepositoryModule } from 'src/couponBet/framework/coupon.module.repository';
import { MatchRepositoryModule } from 'src/match/framework/database/match.repository.module';
import { MatchModule } from 'src/match/adapter/module';


@Module({
  imports: [CouponRepositoryModule, UserRepositoryModule, BetRepositoryModule, CouponBetRepositoryModule, MatchModule],
  controllers: [CouponController],
  providers: [{ provide: ICouponService, useClass: CouponService }],
  exports: [ICouponService, CouponRepositoryModule],
})
export class CouponModule {}
