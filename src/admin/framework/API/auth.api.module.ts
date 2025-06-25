import { Module } from '@nestjs/common';
import { AuthAPIService } from './auth.api.service';

@Module({
  imports: [],
  providers: [AuthAPIService],
  exports: [AuthAPIService],
})
export class AdminAuthApiModule {}
