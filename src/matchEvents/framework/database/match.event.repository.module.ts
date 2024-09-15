import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEventEntity } from './schema/match.event.entity';
import { IMatchEventRepository } from 'src/matchEvents/domain';
import { MatchEventRepository } from './match.event.repository';


@Module({
  imports: [TypeOrmModule.forFeature([MatchEventEntity])],
  providers: [
    {
      provide: IMatchEventRepository,
      useClass: MatchEventRepository,
    },
  ],
  exports: [IMatchEventRepository],
})
export class MatchEventRepositoryModule {}
