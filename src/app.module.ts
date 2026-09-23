import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './_shared/adapter/exception/http-exception.filter';
import { AccountRepositoryModule } from './account/framework/database/account.repository.module';
import { AuthModule as AccountAuthModule } from './account/adapter/module/auth/auth.module';
import { AccountGuardModule } from './account/adapter/guard/account-guard.module';
// Anciens modules utilisateurs & admin remplacés par Account :
// import { UserModule } from './user/adapter/module/user';
// import { AuthModule } from './user/adapter/module/auth';
// import { AdminModule } from './admin/adapter/module/admin';
// import { AdminAuthModule } from './admin/adapter/module/auth';

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
import { TransactionModule } from './transactions/adapter/module';
import { PasswordModule } from './password/password.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ForgotPassModule } from './forgotpass/adapter/module';
import { TournoiModule } from './tournoi/adapter/module';
import { TournoiCouponModule } from './tournoiCoupon/adapter/module';
import { TournoiCouponBetModule } from './tournoiCouponBet/adapter/module';
import { MVPModule } from './mvp/adapter/module';
import { OrganizationModule } from './organization/adapter/module/organization.module';

@Module({
  imports: [
    AccountRepositoryModule,
    AccountAuthModule,
    AccountGuardModule, // @Global() — fournit AccountGuard à toute l'application
    // UserModule, 
    // AuthModule,
    // AdminModule,
    // AdminAuthModule,
    OrganizationModule,
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
    MVPModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class IAppModule {}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['test.env', '.test.env', '.env', '.dev.env', '.prod.env'],
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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || process.env.DB_HOST || 'localhost',
        port: +(configService.get<number>('DB_PORT') || process.env.DB_PORT || 5432),
        username: configService.get<string>('DB_USERNAME') || process.env.DB_USERNAME || 'postgres',
        password: String(configService.get<string>('DB_PASSWORD') ?? process.env.DB_PASSWORD ?? ''),
        database: configService.get<string>('DB_NAME') || process.env.DB_NAME || 'petitpotopro',
        logger: 'advanced-console',
        logging: ['error'],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 50,
    }]),
    ScheduleModule.forRoot(),
    SeedsModule,
    IAppModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
