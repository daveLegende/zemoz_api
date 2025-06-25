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
exports.CouponBetEntity = void 0;
const timestamp_abstract_1 = require("../../../_shared/framework/timestamp.abstract");
const bet_entity_1 = require("../../../bet/framework/schema/bet.entity");
const coupon_entity_1 = require("../../../coupon/framework/schema/coupon.entity");
const domain_1 = require("../../domain");
const typeorm_1 = require("typeorm");
let CouponBetEntity = class CouponBetEntity extends timestamp_abstract_1.ATimestamp {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CouponBetEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => coupon_entity_1.CouponEntity, (coupon) => coupon.couponBets),
    __metadata("design:type", coupon_entity_1.CouponEntity)
], CouponBetEntity.prototype, "coupon", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bet_entity_1.BetEntity, (bet) => bet.couponBets),
    __metadata("design:type", bet_entity_1.BetEntity)
], CouponBetEntity.prototype, "bet", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], CouponBetEntity.prototype, "selectedOptions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: domain_1.BetStatus, default: domain_1.BetStatus.PENDING }),
    __metadata("design:type", String)
], CouponBetEntity.prototype, "status", void 0);
CouponBetEntity = __decorate([
    (0, typeorm_1.Entity)('coupon_bets')
], CouponBetEntity);
exports.CouponBetEntity = CouponBetEntity;
//# sourceMappingURL=coupon_bet.entity.js.map