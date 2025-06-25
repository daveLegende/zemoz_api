"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrononsticModule = void 0;
const common_1 = require("@nestjs/common");
const module_1 = require("../../app/module");
const pronos_controller_1 = require("./pronos.controller");
const pronos_service_1 = require("./pronos.service");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
const match_repository_module_1 = require("../../../match/framework/database/match.repository.module");
const prono_repository_module_1 = require("../../framework/database/prono.repository.module");
const API_1 = require("../../../user/framework/API");
const API_2 = require("../../../admin/framework/API");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
let PrononsticModule = class PrononsticModule {
};
PrononsticModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prono_repository_module_1.PrononsticRepositoryModule,
            match_repository_module_1.MatchRepositoryModule,
            user_repository_module_1.UserRepositoryModule,
            API_1.AuthApiModule,
            admin_repository_module_1.AdminRepositoryModule,
            API_2.AdminAuthApiModule,
        ],
        controllers: [pronos_controller_1.PrononsticController],
        providers: [{ provide: module_1.IPrononsticService, useClass: pronos_service_1.PrononsticService }],
        exports: [module_1.IPrononsticService, prono_repository_module_1.PrononsticRepositoryModule],
    })
], PrononsticModule);
exports.PrononsticModule = PrononsticModule;
//# sourceMappingURL=pronos.module.js.map