"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchModule = void 0;
const common_1 = require("@nestjs/common");
const match_controller_1 = require("./match.controller");
const module_1 = require("../../app/module");
const match_service_1 = require("./match.service");
const match_repository_module_1 = require("../../framework/database/match.repository.module");
const arbitre_repository_module_1 = require("../../../arbitre/framework/database/arbitre.repository.module");
const team_repository_module_1 = require("../../../team/framework/database/team.repository.module");
const poule_repository_module_1 = require("../../../poule/framework/database/poule.repository.module");
const match_gateway_1 = require("./match.gateway");
const player_repository_module_1 = require("../../../player/framework/database/player.repository.module");
const match_event_repository_module_1 = require("../../../matchEvents/framework/database/match.event.repository.module");
const API_1 = require("../../../admin/framework/API");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
const API_2 = require("../../../user/framework/API");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
const module_2 = require("../../../coupon/adapter/module");
const coupon_module_repository_1 = require("../../../coupon/framework/coupon.module.repository");
const paris_module_repository_1 = require("../../../paris/framework/paris.module.repository");
let MatchModule = class MatchModule {
};
MatchModule = __decorate([
    (0, common_1.Module)({
        imports: [
            match_repository_module_1.MatchRepositoryModule,
            arbitre_repository_module_1.ArbitreRepositoryModule,
            team_repository_module_1.TeamRepositoryModule,
            poule_repository_module_1.PouleRepositoryModule,
            player_repository_module_1.PlayerRepositoryModule,
            match_event_repository_module_1.MatchEventRepositoryModule,
            user_repository_module_1.UserRepositoryModule,
            API_2.AuthApiModule,
            admin_repository_module_1.AdminRepositoryModule,
            API_1.AdminAuthApiModule,
            coupon_module_repository_1.CouponRepositoryModule,
            paris_module_repository_1.ParisRepositoryModule,
            module_2.CouponModule,
        ],
        controllers: [match_controller_1.MatchController],
        providers: [match_gateway_1.MatchGateway, { provide: module_1.IMatchService, useClass: match_service_1.MatchService }],
        exports: [module_1.IMatchService, match_repository_module_1.MatchRepositoryModule, match_gateway_1.MatchGateway],
    })
], MatchModule);
exports.MatchModule = MatchModule;
//# sourceMappingURL=match.module.js.map