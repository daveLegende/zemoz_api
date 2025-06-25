"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPassModule = void 0;
const common_1 = require("@nestjs/common");
const fgp_service_1 = require("./fgp.service");
const fgp_controller_1 = require("./fgp.controller");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
const API_1 = require("../../../user/framework/API");
const API_2 = require("../../../admin/framework/API");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
const module_1 = require("../../app/module");
const fgp_repository_module_1 = require("../../framework/database/fgp.repository.module");
let ForgotPassModule = class ForgotPassModule {
};
ForgotPassModule = __decorate([
    (0, common_1.Module)({
        imports: [
            fgp_repository_module_1.ForgotPassRepositoryModule,
            user_repository_module_1.UserRepositoryModule,
            API_1.AuthApiModule,
            admin_repository_module_1.AdminRepositoryModule,
            API_2.AdminAuthApiModule,
        ],
        controllers: [fgp_controller_1.ForgotPassController],
        providers: [{ provide: module_1.IForgotPassService, useClass: fgp_service_1.ForgotPassService }],
        exports: [module_1.IForgotPassService, fgp_repository_module_1.ForgotPassRepositoryModule],
    })
], ForgotPassModule);
exports.ForgotPassModule = ForgotPassModule;
//# sourceMappingURL=fgp.module.js.map