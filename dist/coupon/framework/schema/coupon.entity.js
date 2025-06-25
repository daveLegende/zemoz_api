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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponEntity = void 0;
const timestamp_abstract_1 = require("../../../_shared/framework/timestamp.abstract");
const domain_1 = require("../../domain");
const coupon_bet_entity_1 = require("../../../couponBet/framework/schema/coupon_bet.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../user/framework/database/schema/user.entity");
let CouponEntity = class CouponEntity extends timestamp_abstract_1.ATimestamp {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CouponEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.bets),
    __metadata("design:type", user_entity_1.UserEntity)
], CouponEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => coupon_bet_entity_1.CouponBetEntity, (couponBet) => couponBet.coupon),
    __metadata("design:type", Array)
], CouponEntity.prototype, "couponBets", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], CouponEntity.prototype, "totalOdds", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], CouponEntity.prototype, "gains", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CouponEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: domain_1.CouponState, default: domain_1.CouponState.PENDING }),
    __metadata("design:type", String)
], CouponEntity.prototype, "etat", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CouponEntity.prototype, "isDeleted", void 0);
CouponEntity = __decorate([
    (0, typeorm_1.Entity)('coupons')
], CouponEntity);
exports.CouponEntity = CouponEntity;
//# sourceMappingURL=coupon.entity.js.map