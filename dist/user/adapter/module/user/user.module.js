"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const API_1 = require("../../../framework/API");
const user_1 = require("../../../app/module/user");
const user_repository_module_1 = require("../../../framework/database/user.repository.module");
const admin_repository_module_1 = require("../../../../admin/framework/database/admin.repository.module");
const API_2 = require("../../../../admin/framework/API");
const fgp_repository_module_1 = require("../../../../forgotpass/framework/database/fgp.repository.module");
const ticket_repository_module_1 = require("../../../../ticket/framework/database/ticket.repository.module");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const coupon_module_repository_1 = require("../../../../coupon/framework/coupon.module.repository");
const paris_module_repository_1 = require("../../../../paris/framework/paris.module.repository");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '15m' },
                }),
            }),
            config_1.ConfigModule,
            fgp_repository_module_1.ForgotPassRepositoryModule,
            user_repository_module_1.UserRepositoryModule,
            API_1.AuthApiModule,
            admin_repository_module_1.AdminRepositoryModule,
            API_2.AdminAuthApiModule,
            ticket_repository_module_1.TicketRepositoryModule,
            coupon_module_repository_1.CouponRepositoryModule,
            paris_module_repository_1.ParisRepositoryModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [{ provide: user_1.IUserService, useClass: user_service_1.UserService }],
        exports: [user_1.IUserService, user_repository_module_1.UserRepositoryModule, API_1.AuthApiModule],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map