import { forwardRef, Module } from '@nestjs/common';
import { ICouponService } from '../../../coupon/app/module';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { AccountRepositoryModule } from '../../../account/framework/database/account.repository.module';
import { CouponService } from './coupon.service';
import { CouponController } from '.';
import { CouponRepositoryModule } from '../../../coupon/framework/coupon.module.repository';
import { BetRepositoryModule } from '../../../bet/framework/bet.module.repository';
import { CouponBetRepositoryModule } from '../../../couponBet/framework/coupon.module.repository';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';
import { MatchModule } from '../../../match/adapter/module';

@Module({
  imports: [
    CouponRepositoryModule,
    BetRepositoryModule, 
    CouponBetRepositoryModule, 
    MatchRepositoryModule, 
    forwardRef(() => MatchModule),
    UserRepositoryModule,
    AccountRepositoryModule,
  ],
  controllers: [CouponController],
  providers: [{ provide: ICouponService, useClass: CouponService }],
  exports: [ICouponService, CouponRepositoryModule],
})
export class CouponModule {}
