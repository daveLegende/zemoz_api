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
exports.TournoiController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const dto_1 = require("../../../_shared/adapter/dto");
const base_config_1 = require("../../../_shared/config/base.config");
const dto_2 = require("../dto");
const dto_3 = require("../../../user/adapter/dto");
const tournoi_factory_1 = require("../tournoi.factory");
const module_1 = require("../../app/module");
const dto_4 = require("../dto");
const doc_tournoi_dto_1 = require("../dto/doc.tournoi.dto");
const auth_guard_1 = require("../../../admin/adapter/guard/auth.guard");
let TournoiController = class TournoiController {
    constructor(tournoiService) {
        this.tournoiService = tournoiService;
    }
    async all() {
        const tournois = await this.tournoiService.fetchAll();
        return tournois === null || tournois === void 0 ? void 0 : tournois.map((tournoi) => tournoi_factory_1.TournoiFactory.getTournoi(tournoi));
    }
    async search(param) {
        if (param) {
            return tournoi_factory_1.TournoiFactory.getTournoi(await this.tournoiService.search(param));
        }
    }
    async show({ id }) {
        return tournoi_factory_1.TournoiFactory.getTournoi(await this.tournoiService.fetchOne(id));
    }
    async create(data) {
        const tournoi = await this.tournoiService.add(data);
        if (tournoi)
            return tournoi_factory_1.TournoiFactory.getTournoi(tournoi);
    }
    async update(data) {
        return tournoi_factory_1.TournoiFactory.getTournoi(await this.tournoiService.edit(data));
    }
    async setState({ id }) {
        return await this.tournoiService.setState(id);
    }
    remove({ id }) {
        return this.tournoiService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Tournois list',
        description: 'Fetch all Tournois in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TournoiController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_4.TournoiAccoutDTO]),
    __metadata("design:returntype", Promise)
], TournoiController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One Tournoi',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: doc_tournoi_dto_1.DocTournoiOutputDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], TournoiController.prototype, "show", null);
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
        summary: 'Create Tournoi',
    }),
    (0, swagger_1.ApiBody)({ type: dto_3.RegisterAccoutDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_3.DocUserOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_4.TournoiAccoutDTO]),
    __metadata("design:returntype", Promise)
], TournoiController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Patch)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update user account' }),
    (0, swagger_1.ApiBody)({ type: dto_2.UpdateTournoiDTO }),
    (0, swagger_1.ApiResponse)({ type: doc_tournoi_dto_1.DocTournoiOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdateTournoiDTO]),
    __metadata("design:returntype", Promise)
], TournoiController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Set user account state' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], TournoiController.prototype, "setState", null);
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
], TournoiController.prototype, "remove", null);
TournoiController = __decorate([
    (0, swagger_1.ApiTags)('Tournois management'),
    (0, common_1.Controller)('tournois'),
    __metadata("design:paramtypes", [module_1.ITournoiService])
], TournoiController);
exports.TournoiController = TournoiController;
//# sourceMappingURL=tournoi.controller.js.map