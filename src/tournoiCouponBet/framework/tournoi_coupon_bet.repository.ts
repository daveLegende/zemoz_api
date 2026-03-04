import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from 'framework/database.repository';
import { IGenericRepository } from '../../igeneric.interface';
import { Repository } from 'typeorm';
import { TournoiCouponBet } from '../domain';
import { ITournoiCouponBetRepository } from '../domain/data.abstract';
import { TournoiCouponBetEntity } from './schema/tournoi_coupon_bet.entity';

@Injectable()
export class TournoiCouponBetRepository implements ITournoiCouponBetRepository, OnApplicationBootstrap {
    tournoiCouponBets: IGenericRepository<TournoiCouponBet>;
    
    constructor(
        @InjectRepository(TournoiCouponBetEntity)
        private tournoiCouponBetRepository: Repository<TournoiCouponBetEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.tournoiCouponBets = new DBGenericRepository<TournoiCouponBetEntity>(this.tournoiCouponBetRepository);
    }
}
