import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { ITicketService } from '../../../ticket/app/module';
import { TicketController } from './ticket.controller';
import { TicketRepositoryModule } from '../../../ticket/framework/database/ticket.repository.module';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';
import { AuthApiModule } from '../../../user/framework/API';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';


@Module({
  imports: [
    TicketRepositoryModule, 
    MatchRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
  ],
  controllers: [TicketController],
  providers: [{ provide: ITicketService, useClass: TicketService }],
  exports: [ITicketService, TicketRepositoryModule],
})
export class TicketModule {}
