"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbitreModule = void 0;
const common_1 = require("@nestjs/common");
const arbitre_controller_1 = require("./arbitre.controller");
const module_1 = require("../../app/module");
const arbitre_service_1 = require("./arbitre.service");
const arbitre_repository_module_1 = require("../../framework/database/arbitre.repository.module");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
const API_1 = require("../../../admin/framework/API");
let ArbitreModule = class ArbitreModule {
};
ArbitreModule = __decorate([
    (0, common_1.Module)({
        imports: [admin_repository_module_1.AdminRepositoryModule, API_1.AdminAuthApiModule, arbitre_repository_module_1.ArbitreRepositoryModule],
        controllers: [arbitre_controller_1.ArbitreController],
        providers: [{ provide: module_1.IArbitreService, useClass: arbitre_service_1.ArbitreService }],
        exports: [module_1.IArbitreService, arbitre_repository_module_1.ArbitreRepositoryModule],
    })
], ArbitreModule);
exports.ArbitreModule = ArbitreModule;
//# sourceMappingURL=arbitre.module.js.map