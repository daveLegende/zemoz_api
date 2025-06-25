import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ICouponRepository } from '../domain/data.abstract';
import { CouponRepository } from './coupon.repository';
import { CouponEntity } from './schema/coupon.entity';


@Module({
  imports: [TypeOrmModule.forFeature([CouponEntity])],
  providers: [
    {
      provide: ICouponRepository,
      useClass: CouponRepository,
    },
  ],
  exports: [ICouponRepository],
})
export class CouponRepositoryModule {}
