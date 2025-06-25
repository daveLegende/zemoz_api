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
exports.MatchEventController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const dto_1 = require("../../../_shared/adapter/dto");
const base_config_1 = require("../../../_shared/config/base.config");
const domain_1 = require("../../domain");
const dto_2 = require("../dto");
const match_events_factory_1 = require("../match.events.factory");
const module_1 = require("../../app/module");
const auth_guard_1 = require("../../../admin/adapter/guard/auth.guard");
let MatchEventController = class MatchEventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async all() {
        const matchs = await this.eventService.fetchAll();
        console.log(matchs);
        return matchs === null || matchs === void 0 ? void 0 : matchs.map((match) => match_events_factory_1.MatchEventFactory.getMatch(match));
    }
    async search(param) {
        if (param) {
            const match = new domain_1.MatchEvent();
            return match_events_factory_1.MatchEventFactory.getMatch(await this.eventService.search(match));
        }
    }
    async show({ id }) {
        return match_events_factory_1.MatchEventFactory.getMatch(await this.eventService.fetchOne(id));
    }
    async create(data) {
        console.log("creation de match");
        const match = await this.eventService.add(data);
        if (match)
            return match_events_factory_1.MatchEventFactory.getMatch(match);
    }
    async update(data) {
        return match_events_factory_1.MatchEventFactory.getMatch(await this.eventService.edit(data));
    }
    async setState({ id }) {
        return await this.eventService.setState(id);
    }
    remove({ id }) {
        return this.eventService.remove(id);
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
], MatchEventController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [domain_1.MatchEvent]),
    __metadata("design:returntype", Promise)
], MatchEventController.prototype, "search", null);
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
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], MatchEventController.prototype, "show", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create match',
    }),
    (0, swagger_1.ApiBody)({ type: dto_2.MatchEventDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.MatchEventDTO]),
    __metadata("design:returntype", Promise)
], MatchEventController.prototype, "create", null);
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
    (0, swagger_1.ApiBody)({ type: dto_2.UpdateMatchEventDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdateMatchEventDto]),
    __metadata("design:returntype", Promise)
], MatchEventController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Set match account state' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the match' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], MatchEventController.prototype, "setState", null);
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
], MatchEventController.prototype, "remove", null);
MatchEventController = __decorate([
    (0, swagger_1.ApiTags)('matchs management'),
    (0, common_1.Controller)('matchs_events'),
    __metadata("design:paramtypes", [module_1.IMatchEventService])
], MatchEventController);
exports.MatchEventController = MatchEventController;
//# sourceMappingURL=match.event.controller.js.map