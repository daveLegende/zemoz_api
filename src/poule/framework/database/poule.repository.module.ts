import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IPouleRepository } from '../../domain';
import { PouleRepository } from './poule.repository';
import { PouleEntity } from './schema/poule.entity';


@Module({
  imports: [TypeOrmModule.forFeature([PouleEntity])],
  providers: [
    {
      provide: IPouleRepository,
      useClass: PouleRepository,
    },
  ],
  exports: [IPouleRepository],
})
export class PouleRepositoryModule {}
