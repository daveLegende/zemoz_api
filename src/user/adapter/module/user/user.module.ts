import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthApiModule } from '../../../framework/API';
import { IUserService } from '../../../app/module/user';
import { UserRepositoryModule } from '../../../framework/database/user.repository.module';
import { AdminRepositoryModule } from '../../../../admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from '../../../../admin/framework/API';
import { ForgotPassRepositoryModule } from '../../../../forgotpass/framework/database/fgp.repository.module';
import { TicketRepositoryModule } from '../../../../ticket/framework/database/ticket.repository.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CouponRepositoryModule } from '../../../../coupon/framework/coupon.module.repository';
import { ParisRepositoryModule } from '../../../../paris/framework/paris.module.repository';
import { TournoiCouponRepositoryModule } from '../../../../tournoiCoupon/framework/tournoi_coupon.module.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
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
    ParisRepositoryModule,
    TournoiCouponRepositoryModule,
  ],
  controllers: [UserController],
  providers: [{ provide: IUserService, useClass: UserService }],
  exports: [IUserService, UserRepositoryModule, AuthApiModule],
})
export class UserModule {}
