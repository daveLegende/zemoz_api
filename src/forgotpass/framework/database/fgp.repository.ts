import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from 'framework/database.repository';
import { ForgotPass, IForgotPassRepository } from 'src/forgotpass/domain';
import { IGenericRepository } from 'src/igeneric.interface';
import { Repository } from 'typeorm';
import { ForgotPassEntity } from './schema/fgp.entity';

@Injectable()
export class ForgotPassRepository implements IForgotPassRepository, OnApplicationBootstrap {
    fgps: IGenericRepository<ForgotPass>;
    
    constructor(
        @InjectRepository(ForgotPassEntity)
        private forgotPassRepository: Repository<ForgotPassEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.fgps = new DBGenericRepository<ForgotPassEntity>(this.forgotPassRepository);
    }
}
