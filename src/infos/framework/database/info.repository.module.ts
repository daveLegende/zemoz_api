import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IInfoRepository } from '../../../infos/domain';
import { InfoRepository } from './info.repository';
import { InfoEntity } from './schema/info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InfoEntity])],
  providers: [
    {
      provide: IInfoRepository,
      useClass: InfoRepository,
    },
  ],
  exports: [IInfoRepository],
})
export class InfoRepositoryModule {}
