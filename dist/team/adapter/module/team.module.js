"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModule = void 0;
const common_1 = require("@nestjs/common");
const module_1 = require("../../app/module");
const team_controller_1 = require("./team.controller");
const team_service_1 = require("./team.service");
const team_repository_module_1 = require("../../framework/database/team.repository.module");
const player_repository_module_1 = require("../../../player/framework/database/player.repository.module");
const API_1 = require("../../../admin/framework/API");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
const API_2 = require("../../../user/framework/API");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
let TeamModule = class TeamModule {
};
TeamModule = __decorate([
    (0, common_1.Module)({
        imports: [
            team_repository_module_1.TeamRepositoryModule,
            player_repository_module_1.PlayerRepositoryModule,
            user_repository_module_1.UserRepositoryModule,
            API_2.AuthApiModule,
            admin_repository_module_1.AdminRepositoryModule,
            API_1.AdminAuthApiModule,
        ],
        controllers: [team_controller_1.TeamController],
        providers: [{ provide: module_1.ITeamService, useClass: team_service_1.TeamService }],
        exports: [module_1.ITeamService, team_repository_module_1.TeamRepositoryModule],
    })
], TeamModule);
exports.TeamModule = TeamModule;
//# sourceMappingURL=team.module.js.map