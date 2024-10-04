import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthApiModule } from 'user/framework/API';
import { IUserService } from 'user/app/module/user';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { ForgotPassRepositoryModule } from 'src/forgotpass/framework/database/fgp.repository.module';

@Module({
  imports: [
    ForgotPassRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
  ],
  controllers: [UserController],
  providers: [{ provide: IUserService, useClass: UserService }],
  exports: [IUserService, UserRepositoryModule, AuthApiModule],
})
export class UserModule {}
