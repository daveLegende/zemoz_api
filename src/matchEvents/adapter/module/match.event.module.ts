import { Module } from '@nestjs/common';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { ArbitreRepositoryModule } from '../../../arbitre/framework/database/arbitre.repository.module';
import { MatchGateway } from '../../../match/adapter/module/match.gateway';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';
import { IMatchEventService } from '../../../matchEvents/app/module';
import { MatchEventRepositoryModule } from '../../../matchEvents/framework/database/match.event.repository.module';
import { PlayerRepositoryModule } from '../../../player/framework/database/player.repository.module';
import { PouleRepositoryModule } from '../../../poule/framework/database/poule.repository.module';
import { TeamRepositoryModule } from '../../../team/framework/database/team.repository.module';
import { AuthApiModule } from '../../../user/framework/API';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
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
