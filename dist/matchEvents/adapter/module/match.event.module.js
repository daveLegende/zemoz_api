"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchEventModule = void 0;
const common_1 = require("@nestjs/common");
const API_1 = require("../../../admin/framework/API");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
const arbitre_repository_module_1 = require("../../../arbitre/framework/database/arbitre.repository.module");
const match_gateway_1 = require("../../../match/adapter/module/match.gateway");
const match_repository_module_1 = require("../../../match/framework/database/match.repository.module");
const module_1 = require("../../app/module");
const match_event_repository_module_1 = require("../../framework/database/match.event.repository.module");
const player_repository_module_1 = require("../../../player/framework/database/player.repository.module");
const poule_repository_module_1 = require("../../../poule/framework/database/poule.repository.module");
const team_repository_module_1 = require("../../../team/framework/database/team.repository.module");
const API_2 = require("../../../user/framework/API");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
const match_event_controller_1 = require("./match.event.controller");
const match_event_service_1 = require("./match.event.service");
let MatchEventModule = class MatchEventModule {
};
MatchEventModule = __decorate([
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
        ],
        controllers: [match_event_controller_1.MatchEventController],
        providers: [match_gateway_1.MatchGateway, { provide: module_1.IMatchEventService, useClass: match_event_service_1.MatchEventService }],
        exports: [module_1.IMatchEventService, match_event_repository_module_1.MatchEventRepositoryModule, match_gateway_1.MatchGateway],
    })
], MatchEventModule);
exports.MatchEventModule = MatchEventModule;
//# sourceMappingURL=match.event.module.js.map