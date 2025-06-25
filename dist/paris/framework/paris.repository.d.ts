import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { Repository } from 'typeorm';
import { ParisEntity } from './schema/paris.entity';
import { Paris } from '../domain';
import { IParisRepository } from '../domain/data.abstract';
export declare class ParisRepository implements IParisRepository, OnApplicationBootstrap {
    private parisRepository;
    paris: IGenericRepository<Paris>;
    constructor(parisRepository: Repository<ParisEntity>);
    onApplicationBootstrap(): void;
}
