import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ITeamPlayerRepository } from '../../domain';
import { TeamPlayerEntity } from './schema/team-player.entity';
import { TeamPlayerRepository } from './team-player.repository';


@Module({
  imports: [TypeOrmModule.forFeature([TeamPlayerEntity])],
  providers: [
    {
      provide: ITeamPlayerRepository,
      useClass: TeamPlayerRepository,
    },
  ],
  exports: [ITeamPlayerRepository],
})
export class TeamPlayerRepositoryModule {}
