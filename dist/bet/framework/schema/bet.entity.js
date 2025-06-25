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
exports.BetEntity = void 0;
const timestamp_abstract_1 = require("../../../_shared/framework/timestamp.abstract");
const domain_1 = require("../../domain");
const coupon_bet_entity_1 = require("../../../couponBet/framework/schema/coupon_bet.entity");
const match_entity_1 = require("../../../match/framework/database/schema/match.entity");
const typeorm_1 = require("typeorm");
let BetEntity = class BetEntity extends timestamp_abstract_1.ATimestamp {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BetEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: domain_1.CategoryName,
    }),
    __metadata("design:type", String)
], BetEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], BetEntity.prototype, "odds", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => match_entity_1.MatchEntity, (match) => match.bets),
    __metadata("design:type", match_entity_1.MatchEntity)
], BetEntity.prototype, "match", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => coupon_bet_entity_1.CouponBetEntity, (couponBet) => couponBet.bet),
    __metadata("design:type", Array)
], BetEntity.prototype, "couponBets", void 0);
BetEntity = __decorate([
    (0, typeorm_1.Entity)('bets')
], BetEntity);
exports.BetEntity = BetEntity;
//# sourceMappingURL=bet.entity.js.map