import { Module } from '@nestjs/common';
import { IPlayerService } from 'src/player/app/module';
import { PlayerRepositoryModule } from 'src/player/framework/database/player.repository.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TeamRepositoryModule } from 'src/team/framework/database/team.repository.module';


@Module({
  imports: [PlayerRepositoryModule, TeamRepositoryModule],
  controllers: [PlayerController],
  providers: [{ provide: IPlayerService, useClass: PlayerService }],
  exports: [IPlayerService, PlayerRepositoryModule],
})
export class PlayerModule {}
