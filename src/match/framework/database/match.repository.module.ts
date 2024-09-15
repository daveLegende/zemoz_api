import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IMatchRepository } from 'src/match/domain';
import { MatchRepository } from './match.repository';
import { MatchEntity } from './schema/match.entity';


@Module({
  imports: [TypeOrmModule.forFeature([MatchEntity])],
  providers: [
    {
      provide: IMatchRepository,
      useClass: MatchRepository,
    },
  ],
  exports: [IMatchRepository],
})
export class MatchRepositoryModule {}
