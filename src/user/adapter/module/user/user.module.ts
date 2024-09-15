import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthApiModule } from 'user/framework/API';
import { IUserService } from 'user/app/module/user';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';

@Module({
  imports: [UserRepositoryModule, AuthApiModule],
  controllers: [UserController],
  providers: [{ provide: IUserService, useClass: UserService }],
  exports: [IUserService, UserRepositoryModule, AuthApiModule],
})
export class UserModule {}
