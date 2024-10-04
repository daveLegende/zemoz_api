import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'config/strategy';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { TwilioModule } from 'src/twilio/twilio.module';
import { AdminModule } from '../admin';
import { AuthController } from './auth.controller';
import { AdminAuthService } from './auth.service';

@Module({
  imports: [
    AdminRepositoryModule, AdminModule, TwilioModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AdminAuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AdminAuthModule {}
