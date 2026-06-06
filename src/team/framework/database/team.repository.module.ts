import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ITeamRepository } from '../../domain';
import { TeamEntity } from './schema/team.entity';
import { TeamRepository } from './team.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  providers: [
    {
      provide: ITeamRepository,
      useClass: TeamRepository,
    },
  ],
  exports: [ITeamRepository],
})
export class TeamRepositoryModule {}
