import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from '../../../_shared/framework/database.repository';
import { IGenericRepository } from '../../../igeneric.interface';
import { ITournoiRepository, Tournoi } from '../../domain';
import { Repository } from 'typeorm';
import { TournoiEntity } from './schema/tournoi.entity';

@Injectable()
export class TournoiRepository implements ITournoiRepository, OnApplicationBootstrap {
    tournois: IGenericRepository<Tournoi>;
    
    constructor(
        @InjectRepository(TournoiEntity)
        private tournoiRepository: Repository<TournoiEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.tournois = new DBGenericRepository<TournoiEntity>(this.tournoiRepository);
    }
}
