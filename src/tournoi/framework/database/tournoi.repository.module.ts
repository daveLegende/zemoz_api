import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ITournoiRepository } from 'src/tournoi/domain';
import { TournoiRepository } from './tournoi.repository';
import { TournoiEntity } from './schema/tournoi.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TournoiEntity])],
  providers: [
    {
      provide: ITournoiRepository,
      useClass: TournoiRepository,
    },
  ],
  exports: [ITournoiRepository],
})
export class TournoiRepositoryModule {}
