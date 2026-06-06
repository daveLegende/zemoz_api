import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournoiCouponBetEntity } from './schema/tournoi_coupon_bet.entity';
import { ITournoiCouponBetRepository } from '../domain/data.abstract';
import { TournoiCouponBetRepository } from './tournoi_coupon_bet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TournoiCouponBetEntity])],
  providers: [
    {
      provide: ITournoiCouponBetRepository,
      useClass: TournoiCouponBetRepository,
    },
  ],
  exports: [ITournoiCouponBetRepository],
})
export class TournoiCouponBetRepositoryModule {}
