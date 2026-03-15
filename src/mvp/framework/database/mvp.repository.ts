import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from '../../../_shared/framework/database.repository';
import { IGenericRepository } from '../../../igeneric.interface';
import { IMVPRepository, MVP } from '../../domain';
import { Repository } from 'typeorm';
import { MVPEntity } from './schema/mvp.entity';
@Injectable()
export class MvpRepository implements IMVPRepository, OnApplicationBootstrap {
    mvps: IGenericRepository<MVP>;

    constructor(
        @InjectRepository(MVPEntity)
        private mvpRepository: Repository<MVPEntity>,
    ) { }

    onApplicationBootstrap(): void {
        this.mvps = new DBGenericRepository<MVPEntity>(this.mvpRepository);
    }
}
