import { Module } from '@nestjs/common';
import { CouponBetService } from './coupon_bet.service';
import { CouponBetController } from '.';
import { BetRepositoryModule } from 'src/bet/framework/bet.module.repository';
import { ICouponBetService } from 'src/couponBet/app/module';
import { CouponBetRepositoryModule } from 'src/couponBet/framework/coupon.module.repository';
import { CouponRepositoryModule } from 'src/coupon/framework/coupon.module.repository';


@Module({
  imports: [CouponBetRepositoryModule, CouponRepositoryModule, BetRepositoryModule],
  controllers: [CouponBetController],
  providers: [{ provide: ICouponBetService, useClass: CouponBetService }],
  exports: [ICouponBetService, CouponBetRepositoryModule],
})
export class CouponBetModule {}
