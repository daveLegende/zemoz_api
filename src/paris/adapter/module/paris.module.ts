import { Module } from '@nestjs/common';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { AccountRepositoryModule } from '../../../account/framework/database/account.repository.module';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';
import { IParisService } from '../../../paris/app/module';
import { ParisController } from './paris.controller';
import { ParisService } from './paris.service';
import { ParisRepositoryModule } from '../../../paris/framework/paris.module.repository';

@Module({
  imports: [
    ParisRepositoryModule,
    MatchRepositoryModule,
    UserRepositoryModule,
    AccountRepositoryModule,
  ],
  controllers: [ParisController],
  providers: [{ provide: IParisService, useClass: ParisService }],
  exports: [IParisService, ParisRepositoryModule],
})
export class ParisModule {}
