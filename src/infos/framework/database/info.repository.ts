import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from 'framework/database.repository';
import { IGenericRepository } from 'src/igeneric.interface';
import { IInfoRepository, Info } from 'src/infos/domain';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { InfoEntity } from './schema/info.entity';

@Injectable()
export class InfoRepository implements IInfoRepository, OnApplicationBootstrap {
    infos: IGenericRepository<Info>;
    
    constructor(
        @InjectRepository(InfoEntity)
        private InfoRepository: Repository<InfoEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.infos = new DBGenericRepository<InfoEntity>(this.InfoRepository);
    }
}
