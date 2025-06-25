"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModule = void 0;
const common_1 = require("@nestjs/common");
const module_1 = require("../../app/module");
const otp_service_1 = require("./otp.service");
const otp_controller_1 = require("./otp.controller");
const otp_repository_module_1 = require("../../framework/database/otp.repository.module");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
const API_1 = require("../../../user/framework/API");
const twilio_module_1 = require("../../../twilio/twilio.module");
let OtpModule = class OtpModule {
};
OtpModule = __decorate([
    (0, common_1.Module)({
        imports: [otp_repository_module_1.OtpRepositoryModule, user_repository_module_1.UserRepositoryModule, API_1.AuthApiModule, twilio_module_1.TwilioModule],
        controllers: [otp_controller_1.OtpController],
        providers: [otp_service_1.OtpService, { provide: module_1.IOtpService, useClass: otp_service_1.OtpService }],
        exports: [module_1.IOtpService, otp_repository_module_1.OtpRepositoryModule],
    })
], OtpModule);
exports.OtpModule = OtpModule;
//# sourceMappingURL=otp.module.js.map