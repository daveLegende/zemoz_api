import { Module } from '@nestjs/common';
import { ITeamService } from '../../../team/app/module';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamRepositoryModule } from '../../../team/framework/database/team.repository.module';
import { PlayerRepositoryModule } from '../../../player/framework/database/player.repository.module';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { AuthApiModule } from '../../../user/framework/API';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';


@Module({
  imports: [
    TeamRepositoryModule, 
    PlayerRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
  ],
  controllers: [TeamController],
  providers: [{ provide: ITeamService, useClass: TeamService }],
  exports: [ITeamService, TeamRepositoryModule],
})
export class TeamModule {}