"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponBetRepositoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coupon_bet_entity_1 = require("./schema/coupon_bet.entity");
const data_abstract_1 = require("../domain/data.abstract");
const coupon_repository_1 = require("./coupon.repository");
let CouponBetRepositoryModule = class CouponBetRepositoryModule {
};
CouponBetRepositoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([coupon_bet_entity_1.CouponBetEntity])],
        providers: [
            {
                provide: data_abstract_1.ICouponBetRepository,
                useClass: coupon_repository_1.CouponBetRepository,
            },
        ],
        exports: [data_abstract_1.ICouponBetRepository],
    })
], CouponBetRepositoryModule);
exports.CouponBetRepositoryModule = CouponBetRepositoryModule;
//# sourceMappingURL=coupon.module.repository.js.map