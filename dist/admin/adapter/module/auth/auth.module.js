"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const strategy_1 = require("../../../../_shared/config/strategy");
const admin_repository_module_1 = require("../../../framework/database/admin.repository.module");
const twilio_module_1 = require("../../../../twilio/twilio.module");
const admin_1 = require("../admin");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const user_repository_module_1 = require("../../../../user/framework/database/user.repository.module");
let AdminAuthModule = class AdminAuthModule {
};
AdminAuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_repository_module_1.AdminRepositoryModule, admin_1.AdminModule, twilio_module_1.TwilioModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '1h' },
                }),
            }),
            user_repository_module_1.UserRepositoryModule,
        ],
        providers: [auth_service_1.AdminAuthService, strategy_1.JwtStrategy],
        controllers: [auth_controller_1.AuthController],
    })
], AdminAuthModule);
exports.AdminAuthModule = AdminAuthModule;
//# sourceMappingURL=auth.module.js.map