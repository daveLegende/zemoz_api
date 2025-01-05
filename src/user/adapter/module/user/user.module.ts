import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthApiModule } from 'user/framework/API';
import { IUserService } from 'user/app/module/user';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { ForgotPassRepositoryModule } from 'src/forgotpass/framework/database/fgp.repository.module';
import { TicketRepositoryModule } from 'src/ticket/framework/database/ticket.repository.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserGuard } from 'user/adapter/guard/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CouponRepositoryModule } from 'src/coupon/framework/coupon.module.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
    }),
    ConfigModule,
    ForgotPassRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
    TicketRepositoryModule,
    CouponRepositoryModule,
  ],
  controllers: [UserController],
  providers: [{ provide: IUserService, useClass: UserService }],
  exports: [IUserService, UserRepositoryModule, AuthApiModule],
})
export class UserModule {}
