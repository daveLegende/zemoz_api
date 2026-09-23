import { Module } from '@nestjs/common';
import { IPrononsticService } from '../../../prononstic/app/module';
import { PrononsticController } from './pronos.controller';
import { PrononsticService } from './pronos.service';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { AccountRepositoryModule } from '../../../account/framework/database/account.repository.module';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';
import { PrononsticRepositoryModule } from '../../../prononstic/framework/database/prono.repository.module';

@Module({
  imports: [
    PrononsticRepositoryModule, 
    MatchRepositoryModule,
    UserRepositoryModule,
    AccountRepositoryModule,
  ],
  controllers: [PrononsticController],
  providers: [{ provide: IPrononsticService, useClass: PrononsticService }],
  exports: [IPrononsticService, PrononsticRepositoryModule],
})
export class PrononsticModule {}