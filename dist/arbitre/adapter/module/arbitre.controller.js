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
exports.ArbitreController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const dto_1 = require("../../../_shared/adapter/dto");
const base_config_1 = require("../../../_shared/config/base.config");
const module_1 = require("../../app/module");
const arbitre_factory_1 = require("../arbitre.factory");
const dto_2 = require("../dto");
const auth_guard_1 = require("../../../admin/adapter/guard/auth.guard");
let ArbitreController = class ArbitreController {
    constructor(arbitreService) {
        this.arbitreService = arbitreService;
    }
    async all() {
        const Arbitres = await this.arbitreService.fetchAll();
        return Arbitres === null || Arbitres === void 0 ? void 0 : Arbitres.map((Arbitre) => arbitre_factory_1.ArbitreFactory.getArbitre(Arbitre));
    }
    async search(param) {
        if (param) {
            return arbitre_factory_1.ArbitreFactory.getArbitre(await this.arbitreService.search(param));
        }
    }
    async show({ id }) {
        return arbitre_factory_1.ArbitreFactory.getArbitre(await this.arbitreService.fetchOne(id));
    }
    async create(data, file) {
        data.avatar = file === null || file === void 0 ? void 0 : file.filename;
        const arbitre = await this.arbitreService.add(data);
        if (arbitre)
            return arbitre_factory_1.ArbitreFactory.getArbitre(arbitre);
    }
    async update(data, file) {
        data.avatar = file === null || file === void 0 ? void 0 : file.filename;
        return arbitre_factory_1.ArbitreFactory.getArbitre(await this.arbitreService.edit(data));
    }
    async setState({ id }) {
        return await this.arbitreService.setState(id);
    }
    remove({ id }) {
        return this.arbitreService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Arbitres list',
        description: 'Fetch all Arbitres in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArbitreController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.ArbitreAccountDto]),
    __metadata("design:returntype", Promise)
], ArbitreController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One Arbitre',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocArbitreOutputDto }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], ArbitreController.prototype, "show", null);
__decorate([
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
        summary: 'Create Arbitre',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.ArbitreAccountDto, Object]),
    __metadata("design:returntype", Promise)
], ArbitreController.prototype, "create", null);
__decorate([
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
    (0, swagger_1.ApiBody)({ type: dto_2.UpdateArbitreDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocArbitreOutputDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdateArbitreDTO, Object]),
    __metadata("design:returntype", Promise)
], ArbitreController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Set user account state' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], ArbitreController.prototype, "setState", null);
__decorate([
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
], ArbitreController.prototype, "remove", null);
ArbitreController = __decorate([
    (0, swagger_1.ApiTags)('Arbitres management'),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('arbitres'),
    __metadata("design:paramtypes", [module_1.IArbitreService])
], ArbitreController);
exports.ArbitreController = ArbitreController;
//# sourceMappingURL=arbitre.controller.js.map