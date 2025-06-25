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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../_shared/adapter/dto");
const auth_guard_1 = require("../../../user/adapter/guard/auth.guard");
const auth_guard_2 = require("../../../admin/adapter/guard/auth.guard");
const module_1 = require("../../app/module");
const dto_2 = require("../dto");
const transac_factory_1 = require("../transac.factory");
const domain_1 = require("../../domain");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async all() {
        const transactions = await this.transactionService.fetchAll();
        return transactions === null || transactions === void 0 ? void 0 : transactions.map((transaction) => transac_factory_1.TransactionFactory.getTransaction(transaction));
    }
    async search(param) {
        if (param) {
            return transac_factory_1.TransactionFactory.getTransaction(await this.transactionService.search(param));
        }
    }
    async show({ id }) {
        return transac_factory_1.TransactionFactory.getTransaction(await this.transactionService.fetchOne(id));
    }
    async create(data, pass) {
        const transaction = await this.transactionService.add(data, pass);
        if (transaction)
            return transac_factory_1.TransactionFactory.getTransaction(transaction);
    }
    async update(data) {
        return transac_factory_1.TransactionFactory.getTransaction(await this.transactionService.edit(data));
    }
    async setState({ id }) {
        return await this.transactionService.setState(id);
    }
    remove({ id }) {
        return this.transactionService.remove(id);
    }
    async userTransac(data) {
        return;
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Transactions list',
        description: 'Fetch all Transactions in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [domain_1.Transaction]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One Transaction',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocTransactionOutputDto }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "show", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_2.AdminGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create Transaction',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.TransactionAccountDto,
        dto_2.PassAccountDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_2.AdminGuard),
    (0, common_1.Patch)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({ summary: 'Update user account' }),
    (0, swagger_1.ApiBody)({ type: dto_2.UpdateTransactionDTO }),
    (0, swagger_1.ApiResponse)({ type: dto_2.DocTransactionOutputDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdateTransactionDTO]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Set user account state' }),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the user' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "setState", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.UserGuard, auth_guard_2.AdminGuard),
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
], TransactionController.prototype, "remove", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.UserGuard),
    (0, common_1.Post)("user-transaction"),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create Transaction by user',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.TransactionAccountDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "userTransac", null);
TransactionController = __decorate([
    (0, swagger_1.ApiTags)('Transactions management'),
    (0, common_1.Controller)('transactions'),
    __metadata("design:paramtypes", [module_1.ITransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transac.controller.js.map