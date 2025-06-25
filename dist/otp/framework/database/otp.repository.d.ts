import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { IOtpRepository, Otp } from 'src/otp/domain';
import { Repository } from 'typeorm';
import { OtpEntity } from './schema/otp.entity';
export declare class OtpRepository implements IOtpRepository, OnApplicationBootstrap {
    private otpRepository;
    otps: IGenericRepository<Otp>;
    constructor(otpRepository: Repository<OtpEntity>);
    onApplicationBootstrap(): void;
}
