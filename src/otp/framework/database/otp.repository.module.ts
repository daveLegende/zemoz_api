import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IOtpRepository } from '../../../otp/domain';
import { OtpEntity } from './schema/otp.entity';
import { OtpRepository } from './otp.repository';


@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity])],
  providers: [
    {
      provide: IOtpRepository,
      useClass: OtpRepository,
    },
  ],
  exports: [IOtpRepository],
})
export class OtpRepositoryModule {}
