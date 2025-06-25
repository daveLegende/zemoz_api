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
exports.InfoController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const dto_1 = require("../../../_shared/adapter/dto");
const base_config_1 = require("../../../_shared/config/base.config");
const module_1 = require("../../app/module");
const info_factory_1 = require("../info.factory");
const domain_1 = require("../../domain");
const dto_2 = require("../dto");
const auth_guard_1 = require("../../../admin/adapter/guard/auth.guard");
let InfoController = class InfoController {
    constructor(infoService) {
        this.infoService = infoService;
    }
    async all() {
        const infos = await this.infoService.fetchAll();
        return infos === null || infos === void 0 ? void 0 : infos.map((info) => info_factory_1.InfoFactory.getInfo(info));
    }
    async search(param) {
        if (param) {
            return info_factory_1.InfoFactory.getInfo(await this.infoService.search(param));
        }
    }
    async show({ id }) {
        return info_factory_1.InfoFactory.getInfo(await this.infoService.fetchOne(id));
    }
    async create(data, file) {
        data.image = file === null || file === void 0 ? void 0 : file.filename;
        const info = await this.infoService.add(data);
        if (info)
            return info_factory_1.InfoFactory.getInfo(info);
    }
    async update(data, file) {
        data.image = file === null || file === void 0 ? void 0 : file.filename;
        return info_factory_1.InfoFactory.getInfo(await this.infoService.edit(data));
    }
    async setState({ id }) {
        return await this.infoService.setState(id);
    }
    remove({ id }) {
        return this.infoService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Infos list',
        description: 'Fetch all Infos in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [domain_1.Info]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One Info',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocInfoOutputDto }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "show", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: base_config_1.BaseConfig.setFilePath,
            filename: base_config_1.BaseConfig.editFileName,
        }),
        fileFilter: base_config_1.BaseConfig.imageFileFilter,
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create Info',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.InfoAccountDto, Object]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Patch)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: base_config_1.BaseConfig.setFilePath,
            filename: base_config_1.BaseConfig.editFileName,
        }),
        fileFilter: base_config_1.BaseConfig.fileFilter,
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user account' }),
    (0, swagger_1.ApiBody)({ type: dto_2.UpdateInfoDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocInfoOutputDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdateInfoDTO, Object]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Set user account state' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "setState", null);
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
], InfoController.prototype, "remove", null);
InfoController = __decorate([
    (0, swagger_1.ApiTags)('infos management'),
    (0, common_1.Controller)('infos'),
    __metadata("design:paramtypes", [module_1.IInfoService])
], InfoController);
exports.InfoController = InfoController;
//# sourceMappingURL=info.controller.js.map