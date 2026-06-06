import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ITournoiCouponRepository } from '../domain/data.abstract';
import { TournoiCouponRepository } from './tournoi_coupon.repository';
import { TournoiCouponEntity } from './schema/tournoi_coupon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournoiCouponEntity])],
  providers: [
    {
      provide: ITournoiCouponRepository,
      useClass: TournoiCouponRepository,
    },
  ],
  exports: [ITournoiCouponRepository],
})
export class TournoiCouponRepositoryModule {}
