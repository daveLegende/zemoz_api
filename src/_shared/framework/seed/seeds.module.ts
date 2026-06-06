import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { AccessSeed } from './access.seed';
import { AuthAPIService } from '../../../user/framework/API/auth.api.service';

@Module({
  imports: [CommandModule],
  providers: [AccessSeed, AuthAPIService],
})
export class SeedsModule {}
