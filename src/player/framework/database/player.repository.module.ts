import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerEntity } from './schema/player.entity';
import { IPlayerRepository } from 'src/player/domain';
import { PlayerRepository } from './player.repository';


@Module({
  imports: [TypeOrmModule.forFeature([PlayerEntity])],
  providers: [
    {
      provide: IPlayerRepository,
      useClass: PlayerRepository,
    },
  ],
  exports: [IPlayerRepository],
})
export class PlayerRepositoryModule {}
