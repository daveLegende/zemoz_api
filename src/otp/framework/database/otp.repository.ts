import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from 'framework/database.repository';
import { IGenericRepository } from 'src/igeneric.interface';
import { IOtpRepository, Otp } from 'src/otp/domain';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { OtpEntity } from './schema/otp.entity';

@Injectable()
export class OtpRepository implements IOtpRepository, OnApplicationBootstrap {
    otps: IGenericRepository<Otp>;
    
    constructor(
        @InjectRepository(OtpEntity)
        private otpRepository: Repository<OtpEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.otps = new DBGenericRepository<OtpEntity>(this.otpRepository);
    }
}
