import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { Repository } from 'typeorm';
import { Coupon } from '../domain';
import { ICouponRepository } from '../domain/data.abstract';
import { CouponEntity } from './schema/coupon.entity';
export declare class CouponRepository implements ICouponRepository, OnApplicationBootstrap {
    private couponRepository;
    coupons: IGenericRepository<Coupon>;
    constructor(couponRepository: Repository<CouponEntity>);
    onApplicationBootstrap(): void;
}
