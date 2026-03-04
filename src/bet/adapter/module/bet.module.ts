import { Module } from '@nestjs/common';
import { IBetService } from '../../../bet/app/module';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';
import { BetRepositoryModule } from '../../../bet/framework/bet.module.repository';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from '../../../admin/framework/API';


@Module({
  imports: [BetRepositoryModule, MatchRepositoryModule, AdminRepositoryModule, AdminAuthApiModule],
  controllers: [BetController],
  providers: [{ provide: IBetService, useClass: BetService }],
  exports: [IBetService, BetRepositoryModule],
})
export class BetModule {}
