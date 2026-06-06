import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IArbitreRepository } from '../../domain';
import { ArbitreRepository } from './arbitre.repository';
import { ArbitreEntity } from './schema/arbitre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArbitreEntity])],
  providers: [
    {
      provide: IArbitreRepository,
      useClass: ArbitreRepository,
    },
  ],
  exports: [IArbitreRepository],
})
export class ArbitreRepositoryModule {}
