import { Module } from '@nestjs/common';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { ArbitreRepositoryModule } from 'src/arbitre/framework/database/arbitre.repository.module';
import { MatchGateway } from 'src/match/adapter/module/match.gateway';
import { MatchRepositoryModule } from 'src/match/framework/database/match.repository.module';
import { IMatchEventService } from 'src/matchEvents/app/module';
import { MatchEventRepositoryModule } from 'src/matchEvents/framework/database/match.event.repository.module';
import { PlayerRepositoryModule } from 'src/player/framework/database/player.repository.module';
import { PouleRepositoryModule } from 'src/poule/framework/database/poule.repository.module';
import { TeamRepositoryModule } from 'src/team/framework/database/team.repository.module';
import { AuthApiModule } from 'user/framework/API';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { MatchEventController } from './match.event.controller';
import { MatchEventService } from './match.event.service';


@Module({
  imports: [
    MatchRepositoryModule, 
    ArbitreRepositoryModule, 
    TeamRepositoryModule, 
    PouleRepositoryModule, 
    PlayerRepositoryModule,
    MatchEventRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
  ],
  controllers: [MatchEventController],
  providers: [MatchGateway, { provide: IMatchEventService, useClass: MatchEventService }],
  exports: [IMatchEventService, MatchEventRepositoryModule, MatchGateway],
})
export class MatchEventModule {}
