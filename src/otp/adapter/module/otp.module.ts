import { Module } from '@nestjs/common';
import { IOtpService } from '../../../otp/app/module';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { OtpRepositoryModule } from '../../../otp/framework/database/otp.repository.module';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { AuthApiModule } from '../../../user/framework/API';
import { TwilioModule } from '../../../twilio/twilio.module';


@Module({
  imports: [OtpRepositoryModule, UserRepositoryModule, AuthApiModule, TwilioModule],
  controllers: [OtpController],
  providers: [OtpService, { provide: IOtpService, useClass: OtpService }],
  exports: [IOtpService, OtpRepositoryModule],
})
export class OtpModule {}
