import { Module } from '@nestjs/common';
import { ForgotPassService } from './fgp.service';
import { ForgotPassController } from './fgp.controller';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { AuthApiModule } from 'user/framework/API';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { IForgotPassService } from 'src/forgotpass/app/module';
import { ForgotPassRepositoryModule } from 'src/forgotpass/framework/database/fgp.repository.module';


@Module({
  imports: [
    ForgotPassRepositoryModule, 
    UserRepositoryModule, 
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
  ],
  controllers: [ForgotPassController],
  providers: [{ provide: IForgotPassService, useClass: ForgotPassService }],
  exports: [IForgotPassService, ForgotPassRepositoryModule],
})
export class ForgotPassModule {}
