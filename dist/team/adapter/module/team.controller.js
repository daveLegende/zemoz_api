"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const dto_1 = require("../../../_shared/adapter/dto");
const base_config_1 = require("../../../_shared/config/base.config");
const dto_2 = require("../dto");
const dto_3 = require("../../../user/adapter/dto");
const team_factory_1 = require("../team.factory");
const module_1 = require("../../app/module");
const dto_4 = require("../dto");
const doc_team_dto_1 = require("../dto/doc.team.dto");
const auth_guard_1 = require("../../../admin/adapter/guard/auth.guard");
let TeamController = class TeamController {
    constructor(teamService) {
        this.teamService = teamService;
    }
    async all() {
        const teams = await this.teamService.fetchAll();
        return teams === null || teams === void 0 ? void 0 : teams.map((team) => team_factory_1.TeamFactory.getTeam(team));
    }
    async search(param) {
        if (param) {
            return team_factory_1.TeamFactory.getTeam(await this.teamService.search(param));
        }
    }
    async show({ id }) {
        return team_factory_1.TeamFactory.getTeam(await this.teamService.fetchOne(id));
    }
    async create(data, file) {
        data.logo = file === null || file === void 0 ? void 0 : file.filename;
        const team = await this.teamService.add(data);
        if (team)
            return team_factory_1.TeamFactory.getTeam(team);
    }
    async update(data, file) {
        data.logo = file === null || file === void 0 ? void 0 : file.filename;
        return team_factory_1.TeamFactory.getTeam(await this.teamService.edit(data));
    }
    async setState({ id }) {
        return await this.teamService.setState(id);
    }
    remove({ id }) {
        return this.teamService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Teams list',
        description: 'Fetch all Teams in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_4.TeamAccoutDTO]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One Team',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: doc_team_dto_1.DocTeamOutputDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "show", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo', {
        storage: (0, multer_1.diskStorage)({
            destination: base_config_1.BaseConfig.setFilePath,
            filename: base_config_1.BaseConfig.editFileName,
        }),
        fileFilter: base_config_1.BaseConfig.imageFileFilter,
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create Team',
    }),
    (0, swagger_1.ApiBody)({ type: dto_3.RegisterAccoutDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_3.DocUserOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_4.TeamAccoutDTO, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Patch)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('logo', {
        storage: (0, multer_1.diskStorage)({
            destination: base_config_1.BaseConfig.setFilePath,
            filename: base_config_1.BaseConfig.editFileName,
        }),
        fileFilter: base_config_1.BaseConfig.fileFilter,
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user account' }),
    (0, swagger_1.ApiBody)({ type: dto_2.UpdateTeamDTO }),
    (0, swagger_1.ApiResponse)({ type: doc_team_dto_1.DocTeamOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdateTeamDTO, Object]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Set user account state' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "setState", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove Account' }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the user to delete',
    }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], TeamController.prototype, "remove", null);
TeamController = __decorate([
    (0, swagger_1.ApiTags)('teams management'),
    (0, common_1.Controller)('teams'),
    __metadata("design:paramtypes", [module_1.ITeamService])
], TeamController);
exports.TeamController = TeamController;
//# sourceMappingURL=team.controller.js.map