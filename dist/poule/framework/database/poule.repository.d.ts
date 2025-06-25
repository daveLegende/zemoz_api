import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { IPouleRepository, Poule } from 'src/poule/domain';
import { Repository } from 'typeorm';
import { PouleEntity } from './schema/poule.entity';
export declare class PouleRepository implements IPouleRepository, OnApplicationBootstrap {
    private PouleRepository;
    poules: IGenericRepository<Poule>;
    constructor(PouleRepository: Repository<PouleEntity>);
    onApplicationBootstrap(): void;
}
