import { Module } from '@nestjs/common';
import { IPlayerService } from 'src/player/app/module';
import { PlayerRepositoryModule } from 'src/player/framework/database/player.repository.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TeamRepositoryModule } from 'src/team/framework/database/team.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { AuthApiModule } from 'user/framework/API';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';


@Module({
  imports: [
    PlayerRepositoryModule, 
    TeamRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
  ],
  controllers: [PlayerController],
  providers: [{ provide: IPlayerService, useClass: PlayerService }],
  exports: [IPlayerService, PlayerRepositoryModule],
})
export class PlayerModule {}
