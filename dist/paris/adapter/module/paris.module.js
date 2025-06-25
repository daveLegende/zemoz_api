"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParisModule = void 0;
const common_1 = require("@nestjs/common");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
const API_1 = require("../../../admin/framework/API");
const match_repository_module_1 = require("../../../match/framework/database/match.repository.module");
const module_1 = require("../../app/module");
const paris_controller_1 = require("./paris.controller");
const paris_service_1 = require("./paris.service");
const paris_module_repository_1 = require("../../framework/paris.module.repository");
let ParisModule = class ParisModule {
};
ParisModule = __decorate([
    (0, common_1.Module)({
        imports: [paris_module_repository_1.ParisRepositoryModule, match_repository_module_1.MatchRepositoryModule, user_repository_module_1.UserRepositoryModule, admin_repository_module_1.AdminRepositoryModule, API_1.AdminAuthApiModule],
        controllers: [paris_controller_1.ParisController],
        providers: [{ provide: module_1.IParisService, useClass: paris_service_1.ParisService }],
        exports: [module_1.IParisService, paris_module_repository_1.ParisRepositoryModule],
    })
], ParisModule);
exports.ParisModule = ParisModule;
//# sourceMappingURL=paris.module.js.map