"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.IAppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const nest_winston_1 = require("nest-winston");
const winston = require("winston");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const http_exception_filter_1 = require("./_shared/adapter/exception/http-exception.filter");
const user_1 = require("./user/adapter/module/user");
const auth_1 = require("./user/adapter/module/auth");
const seeds_module_1 = require("./_shared/framework/seed/seeds.module");
const module_1 = require("./player/adapter/module");
const module_2 = require("./team/adapter/module");
const module_3 = require("./poule/adapter/module");
const module_4 = require("./arbitre/adapter/module");
const module_5 = require("./match/adapter/module");
const module_6 = require("./infos/adapter/module");
const module_7 = require("./prononstic/adapter/module");
const module_8 = require("./ticket/adapter/module");
const module_9 = require("./bet/adapter/module");
const module_10 = require("./coupon/adapter/module");
const module_11 = require("./couponBet/adapter/module");
const module_12 = require("./otp/adapter/module");
const twilio_module_1 = require("./twilio/twilio.module");
const admin_1 = require("./admin/adapter/module/admin");
const auth_2 = require("./admin/adapter/module/auth");
const module_13 = require("./transactions/adapter/module");
const password_module_1 = require("./password/password.module");
const schedule_1 = require("@nestjs/schedule");
const module_14 = require("./forgotpass/adapter/module");
const module_15 = require("./tournoi/adapter/module");
let IAppModule = class IAppModule {
};
IAppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_1.UserModule,
            auth_1.AuthModule,
            admin_1.AdminModule,
            auth_2.AdminAuthModule,
            module_1.PlayerModule,
            module_2.TeamModule,
            module_3.PouleModule,
            module_4.ArbitreModule,
            module_6.InfoModule,
            module_5.MatchModule,
            module_7.PrononsticModule,
            module_8.TicketModule,
            module_9.BetModule,
            module_10.CouponModule,
            module_11.CouponBetModule,
            module_12.OtpModule,
            twilio_module_1.TwilioModule,
            module_13.TransactionModule,
            password_module_1.PasswordModule,
            module_14.ForgotPassModule,
            module_15.TournoiModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], IAppModule);
exports.IAppModule = IAppModule;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.dev.env',
                expandVariables: true,
                isGlobal: true,
            }),
            nest_winston_1.WinstonModule.forRoot({
                format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
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
                        format: winston.format.combine(winston.format.cli(), winston.format.splat(), winston.format.timestamp(), winston.format.printf((info) => {
                            return `${info.timestamp} ${info.level}: ${info.message}`;
                        })),
                    }),
                ],
            }),
            typeorm_1.TypeOrmModule.forRoot({
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
            schedule_1.ScheduleModule.forRoot(),
            seeds_module_1.SeedsModule,
            IAppModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_FILTER, useClass: http_exception_filter_1.HttpExceptionFilter },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map