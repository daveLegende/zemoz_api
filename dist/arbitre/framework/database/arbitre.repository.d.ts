import { OnApplicationBootstrap } from '@nestjs/common';
import { Arbitre, IArbitreRepository } from 'src/arbitre/domain';
import { IGenericRepository } from 'src/igeneric.interface';
import { ArbitreEntity } from './schema/arbitre.entity';
import { Repository } from 'typeorm';
export declare class ArbitreRepository implements IArbitreRepository, OnApplicationBootstrap {
    private arbitreRepository;
    arbitres: IGenericRepository<Arbitre>;
    constructor(arbitreRepository: Repository<ArbitreEntity>);
    onApplicationBootstrap(): void;
}
