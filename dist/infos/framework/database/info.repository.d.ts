import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { IInfoRepository, Info } from 'src/infos/domain';
import { Repository } from 'typeorm';
import { InfoEntity } from './schema/info.entity';
export declare class InfoRepository implements IInfoRepository, OnApplicationBootstrap {
    private InfoRepository;
    infos: IGenericRepository<Info>;
    constructor(InfoRepository: Repository<InfoEntity>);
    onApplicationBootstrap(): void;
}
