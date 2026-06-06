import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponBetEntity } from './schema/coupon_bet.entity';
import { ICouponBetRepository } from '../domain/data.abstract';
import { CouponBetRepository } from './coupon.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CouponBetEntity])],
  providers: [
    {
      provide: ICouponBetRepository,
      useClass: CouponBetRepository,
    },
  ],
  exports: [ICouponBetRepository],
})
export class CouponBetRepositoryModule {}
