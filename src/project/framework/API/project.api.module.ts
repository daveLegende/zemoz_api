import { Module } from '@nestjs/common';
import { ProjectAPIService } from './project.api.service';

@Module({
  imports: [],
  providers: [ProjectAPIService],
  exports: [ProjectAPIService],
})
export class ProjectApiModule {}
