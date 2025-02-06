import { Module } from '@nestjs/common';
import { ITournoiService } from 'src/tournoi/app/module';
import { TournoiController } from './tournoi.controller';
import { TournoiService } from './tournoi.service';
import { TournoiRepositoryModule } from 'src/tournoi/framework/database/tournoi.repository.module';
import { PlayerRepositoryModule } from 'src/player/framework/database/player.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { AuthApiModule } from 'user/framework/API';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';


@Module({
  imports: [
    TournoiRepositoryModule, 
    PlayerRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
  ],
  controllers: [TournoiController],
  providers: [{ provide: ITournoiService, useClass: TournoiService }],
  exports: [ITournoiService, TournoiRepositoryModule],
})
export class TournoiModule {}