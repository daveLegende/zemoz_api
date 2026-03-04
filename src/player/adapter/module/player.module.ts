import { Module } from '@nestjs/common';
import { IPlayerService } from '../../../player/app/module';
import { PlayerRepositoryModule } from '../../../player/framework/database/player.repository.module';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { TeamRepositoryModule } from '../../../team/framework/database/team.repository.module';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { AuthApiModule } from '../../../user/framework/API';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';


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
