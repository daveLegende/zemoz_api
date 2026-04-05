import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from '../../../_shared/framework/database.repository';
import { IGenericRepository } from '../../../igeneric.interface';
import { IPronosRepository, Prononstic } from '../../domain';
import { Repository } from 'typeorm';
import { PrononsticEntity } from './schema/prono.entity';

@Injectable()
export class PrononsticRepository implements IPronosRepository, OnApplicationBootstrap {
    pronos: IGenericRepository<Prononstic>;
    
    constructor(
        @InjectRepository(PrononsticEntity)
        private prononsticRepository: Repository<PrononsticEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.pronos = new DBGenericRepository<PrononsticEntity>(this.prononsticRepository);
    }
}
