import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from '../../_shared/framework/database.repository';
import { IGenericRepository } from '../../igeneric.interface';
import { Repository } from 'typeorm';
import { CouponBet } from '../domain';
import { ICouponBetRepository } from '../domain/data.abstract';
import { CouponBetEntity } from './schema/coupon_bet.entity';

@Injectable()
export class CouponBetRepository
  implements ICouponBetRepository, OnApplicationBootstrap
{
  couponBets: IGenericRepository<CouponBet>;

  constructor(
    @InjectRepository(CouponBetEntity)
    private couponBetRepository: Repository<CouponBetEntity>,
  ) {}

  onApplicationBootstrap(): void {
    this.couponBets = new DBGenericRepository<CouponBetEntity>(
      this.couponBetRepository,
    );
  }
}
