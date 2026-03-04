import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ITicketRepository } from '../../domain';
import { TicketEntity } from './schema/ticket.entity';
import { TicketRepository } from './ticket.repository';


@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  providers: [
    {
      provide: ITicketRepository,
      useClass: TicketRepository,
    },
  ],
  exports: [ITicketRepository],
})
export class TicketRepositoryModule {}
