import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from '../../_shared/framework/database.repository';
import { IGenericRepository } from '../../igeneric.interface';
import { Repository } from 'typeorm';
import { TournoiCoupon } from '../domain';
import { ITournoiCouponRepository } from '../domain/data.abstract';
import { TournoiCouponEntity } from './schema/tournoi_coupon.entity';

@Injectable()
export class TournoiCouponRepository
  implements ITournoiCouponRepository, OnApplicationBootstrap
{
  tournoiCoupons: IGenericRepository<TournoiCoupon>;

  constructor(
    @InjectRepository(TournoiCouponEntity)
    private tournoiCouponRepository: Repository<TournoiCouponEntity>,
  ) {}

  onApplicationBootstrap(): void {
    this.tournoiCoupons = new DBGenericRepository<TournoiCouponEntity>(
      this.tournoiCouponRepository,
    );
  }
}
