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
exports.PouleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../_shared/adapter/dto");
const poule_factory_1 = require("../poule.factory");
const module_1 = require("../../app/module");
const domain_1 = require("../../domain");
const dto_2 = require("../dto");
const dto_3 = require("../dto");
const auth_guard_1 = require("../../../admin/adapter/guard/auth.guard");
let PouleController = class PouleController {
    constructor(pouleService) {
        this.pouleService = pouleService;
    }
    async all() {
        const poules = await this.pouleService.fetchAll();
        return poules === null || poules === void 0 ? void 0 : poules.map((poule) => poule_factory_1.PouleFactory.getPoule(poule));
    }
    async search(param) {
        if (param) {
            return poule_factory_1.PouleFactory.getPoule(await this.pouleService.search(param));
        }
    }
    async show({ id }) {
        return poule_factory_1.PouleFactory.getPoule(await this.pouleService.fetchOne(id));
    }
    async create(data) {
        const poule = await this.pouleService.add(data);
        if (poule)
            return poule_factory_1.PouleFactory.getPoule(poule);
    }
    async update(data, file) {
        return poule_factory_1.PouleFactory.getPoule(await this.pouleService.edit(data));
    }
    async setState({ id }) {
        return await this.pouleService.setState(id);
    }
    remove({ id }) {
        return this.pouleService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'poules list',
        description: 'Fetch all poules in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PouleController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [domain_1.Poule]),
    __metadata("design:returntype", Promise)
], PouleController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One poule',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: dto_3.DocPouleOutputDto }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], PouleController.prototype, "show", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create poule',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.PouleAccountDto]),
    __metadata("design:returntype", Promise)
], PouleController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, common_1.Patch)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user account' }),
    (0, swagger_1.ApiBody)({ type: dto_2.UpdatePouleDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_3.DocPouleOutputDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdatePouleDTO, Object]),
    __metadata("design:returntype", Promise)
], PouleController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Set user account state' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], PouleController.prototype, "setState", null);
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
], PouleController.prototype, "remove", null);
PouleController = __decorate([
    (0, swagger_1.ApiTags)('poules management'),
    (0, common_1.Controller)('poules'),
    __metadata("design:paramtypes", [module_1.IPouleService])
], PouleController);
exports.PouleController = PouleController;
//# sourceMappingURL=poule.controller.js.map