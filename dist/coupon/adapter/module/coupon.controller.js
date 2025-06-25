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
exports.CouponController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../../_shared/adapter/dto");
const module_1 = require("../../app/module");
const domain_1 = require("../../domain");
const coupon_factory_1 = require("../coupon.factory");
const dto_2 = require("../dto");
const doc_output_dto_1 = require("../dto/doc.output.dto");
const dto_3 = require("../../../match/adapter/dto");
const auth_guard_1 = require("../../../user/adapter/guard/auth.guard");
const auth_guard_2 = require("../../../admin/adapter/guard/auth.guard");
let CouponController = class CouponController {
    constructor(couponService) {
        this.couponService = couponService;
    }
    async all() {
        const coupons = await this.couponService.fetchAll();
        return coupons === null || coupons === void 0 ? void 0 : coupons.map((coupon) => coupon_factory_1.CouponFactory.getCoupon(coupon));
    }
    async search(param) {
        if (param) {
            return coupon_factory_1.CouponFactory.getCoupon(await this.couponService.search(param));
        }
    }
    async show({ id }) {
        return coupon_factory_1.CouponFactory.getCoupon(await this.couponService.fetchOne(id));
    }
    async create(data) {
        const coupon = await this.couponService.add(data);
        if (coupon)
            return coupon_factory_1.CouponFactory.getCoupon(coupon);
    }
    async update(data) {
        return coupon_factory_1.CouponFactory.getCoupon(await this.couponService.edit(data));
    }
    async setState({ id }) {
        return await this.couponService.setState(id);
    }
    remove({ id }) {
        return this.couponService.remove(id);
    }
    async checkCoupons(data) {
        return await this.couponService.checkCoupons(data);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data', 'application/json'),
    (0, swagger_1.ApiOperation)({
        summary: 'Coupons list',
        description: 'Fetch all Coupons in the DB',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [domain_1.Coupon]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'One Coupon',
        description: 'Fetch user account by ID',
    }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the needed account',
    }),
    (0, swagger_1.ApiResponse)({ type: doc_output_dto_1.DocCouponOutputDto }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "show", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create Coupon',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.CouponAccountDto]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(),
    (0, swagger_1.ApiBody)({ type: dto_2.UpdateCouponDTO }),
    (0, swagger_1.ApiResponse)({ type: doc_output_dto_1.DocCouponOutputDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.UpdateCouponDTO]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('state/:id'),
    (0, swagger_1.ApiParam)({ type: String, name: 'id', description: 'ID of the coupon' }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "setState", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove coupon' }),
    (0, swagger_1.ApiParam)({
        type: String,
        name: 'id',
        description: 'ID of the user to delete',
    }),
    (0, swagger_1.ApiResponse)({ type: Boolean }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.IDParamDTO]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('status'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create Coupon',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_3.UpdateMatchDTO]),
    __metadata("design:returntype", Promise)
], CouponController.prototype, "checkCoupons", null);
CouponController = __decorate([
    (0, swagger_1.ApiTags)('Coupon management'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_guard_1.UserGuard, auth_guard_2.AdminGuard),
    (0, common_1.Controller)('coupons'),
    __metadata("design:paramtypes", [module_1.ICouponService])
], CouponController);
exports.CouponController = CouponController;
//# sourceMappingURL=coupon.controller.js.map