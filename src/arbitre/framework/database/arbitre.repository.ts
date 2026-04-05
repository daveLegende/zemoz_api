import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from '../../../_shared/framework/database.repository';
import { Arbitre, IArbitreRepository } from '../../domain';
import { IGenericRepository } from '../../../igeneric.interface';
import { ArbitreEntity } from './schema/arbitre.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArbitreRepository implements IArbitreRepository, OnApplicationBootstrap {
    arbitres: IGenericRepository<Arbitre>;
    
    constructor(
        @InjectRepository(ArbitreEntity)
        private arbitreRepository: Repository<ArbitreEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.arbitres = new DBGenericRepository<ArbitreEntity>(this.arbitreRepository);
    }
}
