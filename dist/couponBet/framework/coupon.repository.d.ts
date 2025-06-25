import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { Repository } from 'typeorm';
import { CouponBet } from '../domain';
import { ICouponBetRepository } from '../domain/data.abstract';
import { CouponBetEntity } from './schema/coupon_bet.entity';
export declare class CouponBetRepository implements ICouponBetRepository, OnApplicationBootstrap {
    private couponBetRepository;
    couponBets: IGenericRepository<CouponBet>;
    constructor(couponBetRepository: Repository<CouponBetEntity>);
    onApplicationBootstrap(): void;
}
