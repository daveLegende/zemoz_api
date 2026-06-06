import { Module } from '@nestjs/common';
import { ITournoiService } from '../../../tournoi/app/module';
import { TournoiController } from './tournoi.controller';
import { TournoiService } from './tournoi.service';
import { TournoiRepositoryModule } from '../../../tournoi/framework/database/tournoi.repository.module';
import { PlayerRepositoryModule } from '../../../player/framework/database/player.repository.module';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { AuthApiModule } from '../../../user/framework/API';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';

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
