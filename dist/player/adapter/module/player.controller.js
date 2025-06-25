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
exports.PlayerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const dto_1 = require("../../../_shared/adapter/dto");
const base_config_1 = require("../../../_shared/config/base.config");
const dto_2 = require("../../../user/adapter/dto");
const module_1 = require("../../app/module");
const domain_1 = require("../../domain");
const dto_3 = require("../dto");
const player_factory_1 = require("../player.factory");
const doc_player_dto_1 = require("../dto/doc.player.dto");
const auth_guard_1 = require("../../../admin/adapter/guard/auth.guard");
let PlayerController = class PlayerController {
    constructor(playerService) {
        this.playerService = playerService;
    }
    async all() {
        const players = await this.playerService.fetchAll();
        return players === null || players === void 0 ? void 0 : players.map((player) => player_factory_1.PlayerFactory.getPlayer(player));
    }
    async search(param) {
        if (param) {
            return player_factory_1.PlayerFactory.getPlayer(await this.playerService.search(param));
        }
    }
    async show({ id }) {
        return player_factory_1.PlayerFactory.getPlayer(await this.playerService.fetchOne(id));
    }
    async create(data, file) {
        data.avatar = file === null || file === void 0 ? void 0 : file.filename;
        const player = await this.playerService.add(data);
        if (player)
            return player_factory_1.PlayerFactory.getPlayer(player);
    }
    async update(data, file) {
        data.avatar = file === null || file === void 0 ? void 0 : file.filename;
        return player_factory_1.PlayerFactory.getPlayer(await this.playerService.edit(data));
    }
    async setState({ id }) {
        return await this.playerService.setState(id);
    }
    remove({ id }) {
        return this.playerService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'players list',
        description: 'Fetch all players in the DB',
    }),
    (0, swagger_1.ApiResponse)({ type: [dto_3.PlayerAccoutDTO] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [domain_1.Player]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One player',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: doc_player_dto_1.DocPlayerOutputDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "show", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar', {
        storage: (0, multer_1.diskStorage)({
            destination: base_config_1.BaseConfig.setFilePath,
            filename: base_config_1.BaseConfig.editFileName,
        }),
        fileFilter: base_config_1.BaseConfig.imageFileFilter,
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create player',
    }),
    (0, swagger_1.ApiBody)({ type: dto_2.RegisterAccoutDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocUserOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.PlayerAccoutDTO, Object]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "create", null);
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
    (0, swagger_1.ApiOperation)({ summary: 'Update user account' }),
    (0, swagger_1.ApiBody)({ type: dto_3.UpdatePlayerDTO }),
    (0, swagger_1.ApiResponse)({ type: doc_player_dto_1.DocPlayerOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.UpdatePlayerDTO, Object]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Set user account state' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], PlayerController.prototype, "setState", null);
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
], PlayerController.prototype, "remove", null);
PlayerController = __decorate([
    (0, swagger_1.ApiTags)('players management'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('players'),
    __metadata("design:paramtypes", [module_1.IPlayerService])
], PlayerController);
exports.PlayerController = PlayerController;
//# sourceMappingURL=player.controller.js.map