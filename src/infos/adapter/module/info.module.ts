import { Module } from '@nestjs/common';
import { IInfoService } from 'src/infos/app/module';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { InfoRepositoryModule } from 'src/infos/framework/database/info.repository.module';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { AuthApiModule } from 'user/framework/API';


@Module({
  imports: [InfoRepositoryModule, UserRepositoryModule, AuthApiModule],
  controllers: [InfoController],
  providers: [{ provide: IInfoService, useClass: InfoService }],
  exports: [IInfoService, InfoRepositoryModule],
})
export class InfoModule {}
