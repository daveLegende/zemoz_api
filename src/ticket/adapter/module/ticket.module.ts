import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ITicketService } from 'src/Ticket/app/module';
import { TicketController } from './ticket.controller';
import { TicketRepositoryModule } from 'src/ticket/framework/database/ticket.repository.module';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';


@Module({
  imports: [TicketRepositoryModule, UserRepositoryModule],
  controllers: [TicketController],
  providers: [{ provide: ITicketService, useClass: TicketService }],
  exports: [ITicketService, TicketRepositoryModule],
})
export class TicketModule {}
