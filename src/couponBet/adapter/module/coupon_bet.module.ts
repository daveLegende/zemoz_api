import { Module } from '@nestjs/common';
import { CouponBetService } from './coupon_bet.service';
import { CouponBetController } from '.';
import { BetRepositoryModule } from 'src/bet/framework/bet.module.repository';
import { ICouponBetService } from 'src/couponBet/app/module';
import { CouponBetRepositoryModule } from 'src/couponBet/framework/coupon.module.repository';
import { CouponRepositoryModule } from 'src/coupon/framework/coupon.module.repository';
import { AuthApiModule } from 'user/framework/API';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';


@Module({
  imports: [
    CouponBetRepositoryModule, 
    CouponRepositoryModule, 
    BetRepositoryModule, 
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
  ],
  controllers: [CouponBetController],
  providers: [{ provide: ICouponBetService, useClass: CouponBetService }],
  exports: [ICouponBetService, CouponBetRepositoryModule],
})
export class CouponBetModule {}
