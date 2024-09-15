import { Module } from '@nestjs/common';
import { MatchController } from './match.controller';
import { IMatchService } from 'src/match/app/module';
import { MatchService } from './match.service';
import { MatchRepositoryModule } from 'src/match/framework/database/match.repository.module';
import { ArbitreRepositoryModule } from 'src/arbitre/framework/database/arbitre.repository.module';
import { TeamRepositoryModule } from 'src/team/framework/database/team.repository.module';
import { PouleRepositoryModule } from 'src/poule/framework/database/poule.repository.module';
import { MatchGateway } from './match.gateway';
import { PlayerRepositoryModule } from 'src/player/framework/database/player.repository.module';
import { MatchEventRepositoryModule } from 'src/matchEvents/framework/database/match.event.repository.module';


@Module({
  imports: [
    MatchRepositoryModule, 
    ArbitreRepositoryModule, 
    TeamRepositoryModule, 
    PouleRepositoryModule, 
    PlayerRepositoryModule,
    MatchEventRepositoryModule
  ],
  controllers: [MatchController],
  providers: [MatchGateway, { provide: IMatchService, useClass: MatchService }],
  exports: [IMatchService, MatchRepositoryModule, MatchGateway],
})
export class MatchModule {}
