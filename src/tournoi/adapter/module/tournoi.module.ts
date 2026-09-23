import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ITournoiService } from '../../../tournoi/app/module';
import { TournoiController } from './tournoi.controller';
import { TournoiService } from './tournoi.service';
import { TournoiMemberController } from './tournoi-member.controller';
import { TournoiMemberService } from './tournoi-member.service';
import { TournoiRepositoryModule } from '../../../tournoi/framework/database/tournoi.repository.module';
import { PlayerRepositoryModule } from '../../../player/framework/database/player.repository.module';
import { AccountRepositoryModule } from '../../../account/framework/database/account.repository.module';
import { TournoiMemberEntity } from '../../framework/database/schema/tournoi_member.entity';
import { TournoiEntity } from '../../framework/database/schema/tournoi.entity';
import { AccountEntity } from '../../../account/framework/database/schema/account.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TournoiMemberEntity, TournoiEntity, AccountEntity]),
    TournoiRepositoryModule,
    PlayerRepositoryModule,
    AccountRepositoryModule,
  ],
  controllers: [TournoiController, TournoiMemberController],
  providers: [
    { provide: ITournoiService, useClass: TournoiService },
    TournoiMemberService,
  ],
  exports: [ITournoiService, TournoiRepositoryModule, TournoiMemberService],
})
export class TournoiModule {}