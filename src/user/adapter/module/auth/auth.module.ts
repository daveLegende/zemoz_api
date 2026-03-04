import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'config/strategy';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { UserModule } from '../user';
import { OtpRepositoryModule } from '../../../../otp/framework/database/otp.repository.module';
import { TwilioModule } from '../../../../twilio/twilio.module';

@Module({
  imports: [
    UserRepositoryModule, OtpRepositoryModule, UserModule, TwilioModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
