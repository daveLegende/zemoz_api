import { forwardRef, Module } from '@nestjs/common';
import { ICouponService } from '../../../coupon/app/module';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { CouponService } from './coupon.service';
import { CouponController } from '.';
import { CouponRepositoryModule } from '../../../coupon/framework/coupon.module.repository';
import { BetRepositoryModule } from '../../../bet/framework/bet.module.repository';
import { CouponBetRepositoryModule } from '../../../couponBet/framework/coupon.module.repository';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';
import { MatchModule } from '../../../match/adapter/module';
import { AuthApiModule } from '../../../user/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from '../../../admin/framework/API';


@Module({
  imports: [
    CouponRepositoryModule,
    BetRepositoryModule, 
    CouponBetRepositoryModule, 
    MatchRepositoryModule, 
    forwardRef(() => MatchModule),
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
  ],
  controllers: [CouponController],
  providers: [{ provide: ICouponService, useClass: CouponService }],
  exports: [ICouponService, CouponRepositoryModule],
})
export class CouponModule {}
