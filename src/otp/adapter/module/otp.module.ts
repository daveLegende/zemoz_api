import { Module } from '@nestjs/common';
import { IOtpService } from 'src/otp/app/module';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { OtpRepositoryModule } from 'src/otp/framework/database/Otp.repository.module';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { AuthApiModule } from 'user/framework/API';
import { TwilioModule } from 'src/twilio/twilio.module';


@Module({
  imports: [OtpRepositoryModule, UserRepositoryModule, AuthApiModule, TwilioModule],
  controllers: [OtpController],
  providers: [OtpService, { provide: IOtpService, useClass: OtpService }],
  exports: [IOtpService, OtpRepositoryModule],
})
export class OtpModule {}
