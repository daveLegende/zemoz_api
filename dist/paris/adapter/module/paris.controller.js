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
exports.ParisController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../_shared/adapter/dto");
const auth_guard_1 = require("../../../admin/adapter/guard/auth.guard");
const module_1 = require("../../app/module");
const domain_1 = require("../../domain");
const dto_2 = require("../dto");
const paris_factory_1 = require("../paris.factory");
const doc_output_dto_1 = require("../dto/doc.output.dto");
let ParisController = class ParisController {
    constructor(parisService) {
        this.parisService = parisService;
    }
    async all() {
        const bets = await this.parisService.fetchAll();
        return bets === null || bets === void 0 ? void 0 : bets.map((bet) => paris_factory_1.ParisFactory.getParis(bet));
    }
    async search(param) {
        if (param) {
            return paris_factory_1.ParisFactory.getParis(await this.parisService.search(param));
        }
    }
    async show({ id }) {
        return paris_factory_1.ParisFactory.getParis(await this.parisService.fetchOne(id));
    }
    async create(data) {
        const bet = await this.parisService.add(data);
        if (bet)
            return paris_factory_1.ParisFactory.getParis(bet);
    }
    async update(data) {
        return paris_factory_1.ParisFactory.getParis(await this.parisService.edit(data));
    }
    async setState({ id }) {
        return await this.parisService.setState(id);
    }
    remove({ id }) {
        return this.parisService.remove(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Bets list',
        description: 'Fetch all Bets in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ParisController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [domain_1.Paris]),
    __metadata("design:returntype", Promise)
], ParisController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One Bet',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: doc_output_dto_1.DocParisOutputDto }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], ParisController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create Bet',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.ParisAccountDto]),
    __metadata("design:returntype", Promise)
], ParisController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiBody)({ type: dto_2.UpdateParisDTO }),
    (0, swagger_1.ApiResponse)({ type: doc_output_dto_1.DocParisOutputDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdateParisDTO]),
    __metadata("design:returntype", Promise)
], ParisController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the bet' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], ParisController.prototype, "setState", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove bet' }),
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
], ParisController.prototype, "remove", null);
ParisController = __decorate([
    (0, swagger_1.ApiTags)('Bet management'),
    (0, common_1.UseGuards)(auth_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('paris'),
    __metadata("design:paramtypes", [module_1.IParisService])
], ParisController);
exports.ParisController = ParisController;
//# sourceMappingURL=paris.controller.js.map