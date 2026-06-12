import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../../../_shared/config/strategy';
import { AdminRepositoryModule } from '../../../framework/database/admin.repository.module';
import { TwilioModule } from '../../../../twilio/twilio.module';
import { AdminModule } from '../admin';
import { AuthController } from './auth.controller';
import { AdminAuthService } from './auth.service';
import { UserRepositoryModule } from '../../../../user/framework/database/user.repository.module';

@Module({
  imports: [
    AdminRepositoryModule, AdminModule, TwilioModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    UserRepositoryModule,
  ],
  providers: [AdminAuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AdminAuthModule {}
