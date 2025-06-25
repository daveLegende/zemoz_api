"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponBetModule = void 0;
const common_1 = require("@nestjs/common");
const coupon_bet_service_1 = require("./coupon_bet.service");
const _1 = require(".");
const bet_module_repository_1 = require("../../../bet/framework/bet.module.repository");
const module_1 = require("../../app/module");
const coupon_module_repository_1 = require("../../framework/coupon.module.repository");
const coupon_module_repository_2 = require("../../../coupon/framework/coupon.module.repository");
const API_1 = require("../../../user/framework/API");
const user_repository_module_1 = require("../../../user/framework/database/user.repository.module");
const API_2 = require("../../../admin/framework/API");
const admin_repository_module_1 = require("../../../admin/framework/database/admin.repository.module");
let CouponBetModule = class CouponBetModule {
};
CouponBetModule = __decorate([
    (0, common_1.Module)({
        imports: [
            coupon_module_repository_1.CouponBetRepositoryModule,
            coupon_module_repository_2.CouponRepositoryModule,
            bet_module_repository_1.BetRepositoryModule,
            user_repository_module_1.UserRepositoryModule,
            API_1.AuthApiModule,
            admin_repository_module_1.AdminRepositoryModule,
            API_2.AdminAuthApiModule,
        ],
        controllers: [_1.CouponBetController],
        providers: [{ provide: module_1.ICouponBetService, useClass: coupon_bet_service_1.CouponBetService }],
        exports: [module_1.ICouponBetService, coupon_module_repository_1.CouponBetRepositoryModule],
    })
], CouponBetModule);
exports.CouponBetModule = CouponBetModule;
//# sourceMappingURL=coupon_bet.module.js.map