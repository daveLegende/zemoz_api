// password.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from './password.service';
import { PasswordEntity } from './entity/pwd.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([PasswordEntity])],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
