import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { ProjectKeySeed } from './project.seed';

@Module({
  imports: [CommandModule],
  providers: [ProjectKeySeed],
})
export class ApiKeySeedModule {}
