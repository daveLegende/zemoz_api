"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetModule = void 0;
const common_1 = require("@nestjs/common");
const module_1 = require("../../app/module");
const bet_controller_1 = require("./bet.controller");
const bet_service_1 = require("./bet.service");
const bet_module_repository_1 = require("../../framework/bet.module.repository");
const match_repository_module_1 = require("../../../match/framework/database/match.repository.module");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
const API_1 = require("../../../admin/framework/API");
let BetModule = class BetModule {
};
BetModule = __decorate([
    (0, common_1.Module)({
        imports: [bet_module_repository_1.BetRepositoryModule, match_repository_module_1.MatchRepositoryModule, admin_repository_module_1.AdminRepositoryModule, API_1.AdminAuthApiModule],
        controllers: [bet_controller_1.BetController],
        providers: [{ provide: module_1.IBetService, useClass: bet_service_1.BetService }],
        exports: [module_1.IBetService, bet_module_repository_1.BetRepositoryModule],
    })
], BetModule);
exports.BetModule = BetModule;
//# sourceMappingURL=bet.module.js.map