import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ITicketService } from '../../../ticket/app/module';
import { TicketController } from './ticket.controller';
import { TicketRepositoryModule } from '../../../ticket/framework/database/ticket.repository.module';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';
import { AccountRepositoryModule } from '../../../account/framework/database/account.repository.module';

@Module({
  imports: [
    TicketRepositoryModule, 
    MatchRepositoryModule,
    UserRepositoryModule,
    AccountRepositoryModule,
  ],
  controllers: [TicketController],
  providers: [{ provide: ITicketService, useClass: TicketService }],
  exports: [ITicketService, TicketRepositoryModule],
})
export class TicketModule {}
