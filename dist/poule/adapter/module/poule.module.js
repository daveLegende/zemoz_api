"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouleModule = void 0;
const common_1 = require("@nestjs/common");
const module_1 = require("../../app/module");
const poule_service_1 = require("./poule.service");
const poule_controller_1 = require("./poule.controller");
const poule_repository_module_1 = require("../../framework/database/poule.repository.module");
const team_repository_module_1 = require("../../../team/framework/database/team.repository.module");
const API_1 = require("../../../admin/framework/API");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
const API_2 = require("../../../user/framework/API");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
let PouleModule = class PouleModule {
};
PouleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            poule_repository_module_1.PouleRepositoryModule,
            team_repository_module_1.TeamRepositoryModule,
            user_repository_module_1.UserRepositoryModule,
            API_2.AuthApiModule,
            admin_repository_module_1.AdminRepositoryModule,
            API_1.AdminAuthApiModule,
        ],
        controllers: [poule_controller_1.PouleController],
        providers: [{ provide: module_1.IPouleService, useClass: poule_service_1.PouleService }],
        exports: [module_1.IPouleService, poule_repository_module_1.PouleRepositoryModule],
    })
], PouleModule);
exports.PouleModule = PouleModule;
//# sourceMappingURL=poule.module.js.map