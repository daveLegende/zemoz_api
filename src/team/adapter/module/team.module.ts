import { Module } from '@nestjs/common';
import { ITeamService } from 'src/team/app/module';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamRepositoryModule } from 'src/team/framework/database/team.repository.module';
import { PlayerRepositoryModule } from 'src/player/framework/database/player.repository.module';


@Module({
  imports: [TeamRepositoryModule, PlayerRepositoryModule],
  controllers: [TeamController],
  providers: [{ provide: ITeamService, useClass: TeamService }],
  exports: [ITeamService, TeamRepositoryModule],
})
export class TeamModule {}