import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { Repository } from 'typeorm';
import { Bet } from '../domain';
import { IBetRepository } from '../domain/data.abstract';
import { BetEntity } from './schema/bet.entity';
export declare class BetRepository implements IBetRepository, OnApplicationBootstrap {
    private betRepository;
    bets: IGenericRepository<Bet>;
    constructor(betRepository: Repository<BetEntity>);
    onApplicationBootstrap(): void;
}
