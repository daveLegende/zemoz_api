import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { IPronosRepository, Prononstic } from 'src/prononstic/domain';
import { Repository } from 'typeorm';
import { PrononsticEntity } from './schema/prono.entity';
export declare class PrononsticRepository implements IPronosRepository, OnApplicationBootstrap {
    private prononsticRepository;
    pronos: IGenericRepository<Prononstic>;
    constructor(prononsticRepository: Repository<PrononsticEntity>);
    onApplicationBootstrap(): void;
}
