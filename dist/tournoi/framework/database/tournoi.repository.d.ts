import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { ITournoiRepository, Tournoi } from 'src/tournoi/domain';
import { Repository } from 'typeorm';
import { TournoiEntity } from './schema/tournoi.entity';
export declare class TournoiRepository implements ITournoiRepository, OnApplicationBootstrap {
    private tournoiRepository;
    tournois: IGenericRepository<Tournoi>;
    constructor(tournoiRepository: Repository<TournoiEntity>);
    onApplicationBootstrap(): void;
}
