import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../../../../_shared/config/strategy';
import { AccountRepositoryModule } from '../../../framework/database/account.repository.module';
import { OtpRepositoryModule } from '../../../../otp/framework/database/otp.repository.module';
import { TwilioModule } from '../../../../twilio/twilio.module';

@Module({
  imports: [
    AccountRepositoryModule,
    OtpRepositoryModule,
    TwilioModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
