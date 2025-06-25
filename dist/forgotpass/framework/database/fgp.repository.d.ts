import { OnApplicationBootstrap } from '@nestjs/common';
import { ForgotPass, IForgotPassRepository } from 'src/forgotpass/domain';
import { IGenericRepository } from 'src/igeneric.interface';
import { Repository } from 'typeorm';
import { ForgotPassEntity } from './schema/fgp.entity';
export declare class ForgotPassRepository implements IForgotPassRepository, OnApplicationBootstrap {
    private forgotPassRepository;
    fgps: IGenericRepository<ForgotPass>;
    constructor(forgotPassRepository: Repository<ForgotPassEntity>);
    onApplicationBootstrap(): void;
}
