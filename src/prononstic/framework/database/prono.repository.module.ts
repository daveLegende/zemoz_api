import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PrononsticEntity } from './schema/prono.entity';
import { IPronosRepository } from '../../domain';
import { PrononsticRepository } from './prono.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PrononsticEntity])],
  providers: [
    {
      provide: IPronosRepository,
      useClass: PrononsticRepository,
    },
  ],
  exports: [IPronosRepository],
})
export class PrononsticRepositoryModule {}
