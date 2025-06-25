import { Module } from '@nestjs/common';
import { IBetService } from 'src/bet/app/module';
import { BetController } from './bet.controller';
import { BetService } from './bet.service';
import { BetRepositoryModule } from 'src/bet/framework/bet.module.repository';
import { MatchRepositoryModule } from 'src/match/framework/database/match.repository.module';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { AuthApiModule } from 'user/framework/API';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';


@Module({
  imports: [BetRepositoryModule, MatchRepositoryModule, AdminRepositoryModule, AdminAuthApiModule],
  controllers: [BetController],
  providers: [{ provide: IBetService, useClass: BetService }],
  exports: [IBetService, BetRepositoryModule],
})
export class BetModule {}
