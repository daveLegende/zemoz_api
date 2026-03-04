import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from 'framework/database.repository';
import { IGenericRepository } from '../../../igeneric.interface';
import { IPouleRepository, Poule } from '../../domain';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { PouleEntity } from './schema/poule.entity';

@Injectable()
export class PouleRepository implements IPouleRepository, OnApplicationBootstrap {
    poules: IGenericRepository<Poule>;
    
    constructor(
        @InjectRepository(PouleEntity)
        private PouleRepository: Repository<PouleEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.poules = new DBGenericRepository<PouleEntity>(this.PouleRepository);
    }
}
