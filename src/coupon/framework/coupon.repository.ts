import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from '../../_shared/framework/database.repository';
import { IGenericRepository } from '../../igeneric.interface';
import { Repository } from 'typeorm';
import { Coupon } from '../domain';
import { ICouponRepository } from '../domain/data.abstract';
import { CouponEntity } from './schema/coupon.entity';

@Injectable()
export class CouponRepository implements ICouponRepository, OnApplicationBootstrap {
    coupons: IGenericRepository<Coupon>;
    
    constructor(
        @InjectRepository(CouponEntity)
        private couponRepository: Repository<CouponEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.coupons = new DBGenericRepository<CouponEntity>(this.couponRepository);
    }
}
