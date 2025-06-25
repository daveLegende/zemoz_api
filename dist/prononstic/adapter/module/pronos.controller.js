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
exports.PrononsticController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../_shared/adapter/dto");
const pronos_factory_1 = require("../pronos.factory");
const dto_2 = require("../dto");
const module_1 = require("../../app/module");
const doc_pronos_dto_1 = require("../dto/doc.pronos.dto");
const auth_guard_1 = require("../../../user/adapter/guard/auth.guard");
const auth_guard_2 = require("../../../admin/adapter/guard/auth.guard");
let PrononsticController = class PrononsticController {
    constructor(pronoService) {
        this.pronoService = pronoService;
    }
    async all() {
        const pronos = await this.pronoService.fetchAll();
        return pronos === null || pronos === void 0 ? void 0 : pronos.map((prono) => pronos_factory_1.PrononsticFactory.getPronos(prono));
    }
    async show({ id }) {
        return pronos_factory_1.PrononsticFactory.getPronos(await this.pronoService.fetchOne(id));
    }
    async create(data) {
        const prono = await this.pronoService.add(data);
        if (prono)
            return pronos_factory_1.PrononsticFactory.getPronos(prono);
    }
    async update(data) {
        return pronos_factory_1.PrononsticFactory.getPronos(await this.pronoService.edit(data));
    }
    remove({ id }) {
        return this.pronoService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Prononstics list',
        description: 'Fetch all Prononstics in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrononsticController.prototype, "all", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One prono',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: doc_pronos_dto_1.DocPrononsticOutputDTO }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], PrononsticController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create prono',
    }),
    (0, swagger_1.ApiResponse)({ type: doc_pronos_dto_1.DocPrononsticOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.PrononsticAccoutDTO]),
    __metadata("design:returntype", Promise)
], PrononsticController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user account' }),
    (0, swagger_1.ApiBody)({ type: dto_2.UpdatePrononsticDTO }),
    (0, swagger_1.ApiResponse)({ type: doc_pronos_dto_1.DocPrononsticOutputDTO }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdatePrononsticDTO]),
    __metadata("design:returntype", Promise)
], PrononsticController.prototype, "update", null);
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
], PrononsticController.prototype, "remove", null);
PrononsticController = __decorate([
    (0, swagger_1.ApiTags)('pronos management'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.UserGuard, auth_guard_2.AdminGuard),
    (0, common_1.Controller)('pronos'),
    __metadata("design:paramtypes", [module_1.IPrononsticService])
], PrononsticController);
exports.PrononsticController = PrononsticController;
//# sourceMappingURL=pronos.controller.js.map