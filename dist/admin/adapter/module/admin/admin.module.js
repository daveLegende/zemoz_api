"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const module_1 = require("../../../app/module");
const admin_controller_1 = require("./admin.controller");
const admin_repository_module_1 = require("../../../framework/database/admin.repository.module");
const API_1 = require("../../../framework/API");
const user_1 = require("../../../../user/adapter/module/user");
const user_repository_module_1 = require("../../../../user/framework/database/user.repository.module");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [admin_repository_module_1.AdminRepositoryModule, API_1.AdminAuthApiModule, user_1.UserModule, user_repository_module_1.UserRepositoryModule],
        controllers: [admin_controller_1.AdminController],
        providers: [{ provide: module_1.IAdminService, useClass: admin_service_1.AdminService }],
        exports: [module_1.IAdminService, admin_repository_module_1.AdminRepositoryModule, API_1.AdminAuthApiModule],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map