import { Module } from '@nestjs/common';
import { IPrononsticService } from 'src/prononstic/app/module';
import { PrononsticController } from './pronos.controller';
import { PrononsticService } from './pronos.service';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { MatchRepositoryModule } from 'src/match/framework/database/match.repository.module';
import { PrononsticRepositoryModule } from 'src/prononstic/framework/database/prono.repository.module';
import { AuthApiModule } from 'user/framework/API';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';


@Module({
  imports: [
    PrononsticRepositoryModule, 
    MatchRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,],
  controllers: [PrononsticController],
  providers: [{ provide: IPrononsticService, useClass: PrononsticService }],
  exports: [IPrononsticService, PrononsticRepositoryModule],
})
export class PrononsticModule {}