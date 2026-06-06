import { Module } from '@nestjs/common';
import { CouponBetService } from './coupon_bet.service';
import { CouponBetController } from '.';
import { BetRepositoryModule } from '../../../bet/framework/bet.module.repository';
import { ICouponBetService } from '../../../couponBet/app/module';
import { CouponBetRepositoryModule } from '../../../couponBet/framework/coupon.module.repository';
import { CouponRepositoryModule } from '../../../coupon/framework/coupon.module.repository';
import { AuthApiModule } from '../../../user/framework/API';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';

@Module({
  imports: [
    CouponBetRepositoryModule,
    CouponRepositoryModule,
    BetRepositoryModule,
    UserRepositoryModule,
    MatchRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule,
    AdminAuthApiModule,
  ],
  controllers: [CouponBetController],
  providers: [{ provide: ICouponBetService, useClass: CouponBetService }],
  exports: [ICouponBetService, CouponBetRepositoryModule],
})
export class CouponBetModule {}
