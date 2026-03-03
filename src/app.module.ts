import { Module, OnModuleInit } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './_shared/adapter/exception/http-exception.filter';
import { UserModule } from './user/adapter/module/user';
import { AuthModule } from './user/adapter/module/auth';
import { SeedsModule } from './_shared/framework/seed/seeds.module';
import { PlayerModule } from './player/adapter/module';
import { TeamModule } from './team/adapter/module';
import { PouleModule } from './poule/adapter/module';
import { ArbitreModule } from './arbitre/adapter/module';
import { MatchModule } from './match/adapter/module';
import { InfoModule } from './infos/adapter/module';
import { PrononsticModule } from './prononstic/adapter/module';
import { TicketModule } from './ticket/adapter/module';
import { BetModule } from './bet/adapter/module';
import { CouponModule } from './coupon/adapter/module';
import { CouponBetModule } from './couponBet/adapter/module';
import { OtpModule } from './otp/adapter/module';
import { TwilioModule } from './twilio/twilio.module';
import { AdminModule } from './admin/adapter/module/admin';
import { AdminAuthModule } from './admin/adapter/module/auth';
import { TransactionModule } from './transactions/adapter/module';
import { PasswordModule } from './password/password.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ForgotPassModule } from './forgotpass/adapter/module';
import { TournoiModule } from './tournoi/adapter/module';
import { TournoiCouponModule } from './tournoiCoupon/adapter/module';
import { TournoiCouponBetModule } from './tournoiCouponBet/adapter/module';
// import { TasksModule } from './tasks/task.module';

@Module({
  imports: [
    UserModule, 
    AuthModule,
    AdminModule,
    AdminAuthModule,
    PlayerModule, 
    TeamModule,
    PouleModule,
    ArbitreModule,
    InfoModule,
    MatchModule,
    PrononsticModule,
    TicketModule,
    BetModule,
    CouponModule,
    CouponBetModule,
    OtpModule,
    TwilioModule,
    TransactionModule,
    PasswordModule,
    ForgotPassModule,
    TournoiModule,
    TournoiCouponModule,
    TournoiCouponBetModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class IAppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.prod.env', //.dev.env, .prod.env
      expandVariables: true,
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.File({
          filename: `winston/error.log`,
          level: 'error',
        }),
        new winston.transports.File({
          filename: `winston/combine.log`,
          // level: 'combine',
        }),
        new winston.transports.File({
          filename: `winston/debug.log`,
          level: 'debug',
        }),
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.cli(),
            winston.format.splat(),
            winston.format.timestamp(),
            winston.format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: +process.env.DB_PORT,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      logger: 'advanced-console',
      logging: ['error'],
      synchronize: true,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    ScheduleModule.forRoot(),
    SeedsModule,
    IAppModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})

export class AppModule {}

// export class AppModule implements OnModuleInit {
//   constructor(private readonly passwordService: PasswordService) {}

//   onModuleInit() {
//     // Démarrer la planification des tâches à l'initialisation du module
//     this.passwordService.scheduleDailyPasswordGeneration();
//   }
// }
