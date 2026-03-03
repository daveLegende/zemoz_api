import { Global, Module } from '@nestjs/common';
import { AuthAPIService } from './auth.api.service';

@Global()
@Module({
  imports: [],
  providers: [AuthAPIService],
  exports: [AuthAPIService],
})
export class AuthApiModule { }
