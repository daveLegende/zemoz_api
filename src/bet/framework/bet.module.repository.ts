import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IBetRepository } from '../domain/data.abstract';
import { BetRepository } from './bet.repository';
import { BetEntity } from './schema/bet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BetEntity])],
  providers: [
    {
      provide: IBetRepository,
      useClass: BetRepository,
    },
  ],
  exports: [IBetRepository],
})
export class BetRepositoryModule {}
