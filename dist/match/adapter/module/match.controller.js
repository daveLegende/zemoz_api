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
exports.MatchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const dto_1 = require("../../../_shared/adapter/dto");
const base_config_1 = require("../../../_shared/config/base.config");
const module_1 = require("../../app/module");
const domain_1 = require("../../domain");
const match_factory_1 = require("../match.factory");
const dto_2 = require("../dto");
const dto_3 = require("../../../arbitre/adapter/dto");
const auth_guard_1 = require("../../../admin/adapter/guard/auth.guard");
let MatchController = class MatchController {
    constructor(matchService) {
        this.matchService = matchService;
    }
    async all() {
        const matchs = await this.matchService.fetchAll();
        console.log(matchs);
        return matchs === null || matchs === void 0 ? void 0 : matchs.map((match) => match_factory_1.MatchFactory.getMatch(match));
    }
    async search(param) {
        if (param) {
            const match = new domain_1.Match();
            return match_factory_1.MatchFactory.getMatch(await this.matchService.search(match));
        }
    }
    async show({ id }) {
        return match_factory_1.MatchFactory.getMatch(await this.matchService.fetchOne(id));
    }
    async create(data) {
        console.log("creation de match");
        const match = await this.matchService.add(data);
        if (match)
            return match_factory_1.MatchFactory.getMatch(match);
    }
    async update(data) {
        return match_factory_1.MatchFactory.getMatch(await this.matchService.edit(data));
    }
    async setState({ id }) {
        return await this.matchService.setState(id);
    }
    remove({ id }) {
        return this.matchService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'matchs list',
        description: 'Fetch all matchs in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [domain_1.Match]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One match',
        description: 'Fetch match account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: dto_2.MatchDocOutputDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "show", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create match',
    }),
    (0, swagger_1.ApiBody)({ type: dto_2.MatchAccoutDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_3.DocArbitreOutputDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.MatchAccoutDTO]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Patch)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        storage: (0, multer_1.diskStorage)({
            destination: base_config_1.BaseConfig.setFilePath,
            filename: base_config_1.BaseConfig.editFileName,
        }),
        fileFilter: base_config_1.BaseConfig.fileFilter,
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({ summary: 'Update match account' }),
    (0, swagger_1.ApiBody)({ type: dto_2.UpdateMatchDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_2.MatchDocOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdateMatchDTO]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Set match account state' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the match' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "setState", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove Account' }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the match to delete',
    }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "remove", null);
MatchController = __decorate([
    (0, swagger_1.ApiTags)('matchs management'),
    (0, common_1.Controller)('matchs'),
    __metadata("design:paramtypes", [module_1.IMatchService])
], MatchController);
exports.MatchController = MatchController;
//# sourceMappingURL=match.controller.js.map