import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from 'framework/database.repository';
import { IGenericRepository } from 'src/igeneric.interface';
import { Repository } from 'typeorm';
import { ParisEntity } from './schema/paris.entity';
import { Paris } from '../domain';
import { IParisRepository } from '../domain/data.abstract';

@Injectable()
export class ParisRepository implements IParisRepository, OnApplicationBootstrap {
    paris: IGenericRepository<Paris>;
    
    constructor(
        @InjectRepository(ParisEntity)
        private parisRepository: Repository<ParisEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.paris = new DBGenericRepository<ParisEntity>(this.parisRepository);
    }
}
