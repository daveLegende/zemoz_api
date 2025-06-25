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
exports.ForgotPassController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../_shared/adapter/dto");
const module_1 = require("../../app/module");
const dto_2 = require("../dto");
const fgp_factory_1 = require("../fgp.factory");
let ForgotPassController = class ForgotPassController {
    constructor(fgpService) {
        this.fgpService = fgpService;
    }
    async all() {
        const fgps = await this.fgpService.fetchAll();
        return fgps === null || fgps === void 0 ? void 0 : fgps.map((fgp) => fgp_factory_1.ForgotPassFactory.getFgp(fgp));
    }
    async show({ id }) {
        return fgp_factory_1.ForgotPassFactory.getFgp(await this.fgpService.fetchOne(id));
    }
    async create(data) {
        const fgp = await this.fgpService.add(data);
        if (fgp)
            return fgp_factory_1.ForgotPassFactory.getFgp(fgp);
    }
    remove({ id }) {
        return this.fgpService.remove(id);
    }
    async verifyCode(data) {
        const fgp = await this.fgpService.verifyCode(data);
        return fgp;
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'ForgotPasss list',
        description: 'Fetch all ForgotPasss in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ForgotPassController.prototype, "all", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One ForgotPass',
        description: 'Fetch user account by ID',
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
], ForgotPassController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create ForgotPass',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.ForgotPassAccountDto]),
    __metadata("design:returntype", Promise)
], ForgotPassController.prototype, "create", null);
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
], ForgotPassController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)("verify-code"),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Verify code',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.ForgotPassAccountDto]),
    __metadata("design:returntype", Promise)
], ForgotPassController.prototype, "verifyCode", null);
ForgotPassController = __decorate([
    (0, swagger_1.ApiTags)('forgot pass management'),
    (0, common_1.Controller)('forgotpass'),
    __metadata("design:paramtypes", [module_1.IForgotPassService])
], ForgotPassController);
exports.ForgotPassController = ForgotPassController;
//# sourceMappingURL=fgp.controller.js.map