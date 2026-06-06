import { Module } from '@nestjs/common';
import { IInfoService } from '../../../infos/app/module';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { InfoRepositoryModule } from '../../../infos/framework/database/info.repository.module';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { AuthApiModule } from '../../../user/framework/API';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { CloudinaryModule } from '../../../shared/infrastructure/cloudinary/cloudinary.module';

@Module({
  imports: [
    InfoRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule,
    AdminAuthApiModule,
    CloudinaryModule,
  ],
  controllers: [InfoController],
  providers: [{ provide: IInfoService, useClass: InfoService }],
  exports: [IInfoService, InfoRepositoryModule],
})
export class InfoModule {}
