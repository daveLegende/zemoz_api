// password.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from './password.service';
import { PasswordEntity } from './entity/pwd.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { CronController } from './password.controller';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([PasswordEntity]),
  ],
  providers: [PasswordService],
  controllers: [CronController],
  exports: [PasswordService],
})
export class PasswordModule {}
