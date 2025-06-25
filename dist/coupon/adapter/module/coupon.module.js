"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponModule = void 0;
const common_1 = require("@nestjs/common");
const module_1 = require("../../app/module");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
const coupon_service_1 = require("./coupon.service");
const _1 = require(".");
const coupon_module_repository_1 = require("../../framework/coupon.module.repository");
const bet_module_repository_1 = require("../../../bet/framework/bet.module.repository");
const coupon_module_repository_2 = require("../../../couponBet/framework/coupon.module.repository");
const match_repository_module_1 = require("../../../match/framework/database/match.repository.module");
const module_2 = require("../../../match/adapter/module");
const API_1 = require("../../../user/framework/API");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
const API_2 = require("../../../admin/framework/API");
let CouponModule = class CouponModule {
};
CouponModule = __decorate([
    (0, common_1.Module)({
        imports: [
            coupon_module_repository_1.CouponRepositoryModule,
            bet_module_repository_1.BetRepositoryModule,
            coupon_module_repository_2.CouponBetRepositoryModule,
            match_repository_module_1.MatchRepositoryModule,
            (0, common_1.forwardRef)(() => module_2.MatchModule),
            user_repository_module_1.UserRepositoryModule,
            API_1.AuthApiModule,
            admin_repository_module_1.AdminRepositoryModule,
            API_2.AdminAuthApiModule,
        ],
        controllers: [_1.CouponController],
        providers: [{ provide: module_1.ICouponService, useClass: coupon_service_1.CouponService }],
        exports: [module_1.ICouponService, coupon_module_repository_1.CouponRepositoryModule],
    })
], CouponModule);
exports.CouponModule = CouponModule;
//# sourceMappingURL=coupon.module.js.map