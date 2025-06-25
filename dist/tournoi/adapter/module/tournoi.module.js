"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournoiModule = void 0;
const common_1 = require("@nestjs/common");
const module_1 = require("../../app/module");
const tournoi_controller_1 = require("./tournoi.controller");
const tournoi_service_1 = require("./tournoi.service");
const tournoi_repository_module_1 = require("../../framework/database/tournoi.repository.module");
const player_repository_module_1 = require("../../../player/framework/database/player.repository.module");
const API_1 = require("../../../admin/framework/API");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
const API_2 = require("../../../user/framework/API");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
let TournoiModule = class TournoiModule {
};
TournoiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            tournoi_repository_module_1.TournoiRepositoryModule,
            player_repository_module_1.PlayerRepositoryModule,
            user_repository_module_1.UserRepositoryModule,
            API_2.AuthApiModule,
            admin_repository_module_1.AdminRepositoryModule,
            API_1.AdminAuthApiModule,
        ],
        controllers: [tournoi_controller_1.TournoiController],
        providers: [{ provide: module_1.ITournoiService, useClass: tournoi_service_1.TournoiService }],
        exports: [module_1.ITournoiService, tournoi_repository_module_1.TournoiRepositoryModule],
    })
], TournoiModule);
exports.TournoiModule = TournoiModule;
//# sourceMappingURL=tournoi.module.js.map