import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthApiModule } from 'user/framework/API';
import { IAuthService } from 'user/app/module/auth';
import { UserModule } from '../user';

@Module({
  imports: [AuthApiModule, UserModule],
  controllers: [AuthController],
  providers: [{ provide: IAuthService, useClass: AuthService }],
  exports: [IAuthService, AuthApiModule],
})
export class AuthModule {}
