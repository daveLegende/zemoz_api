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
exports.UpdateCouponDTO = exports.CouponAccountDto = exports.BetCouponDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const dto_1 = require("../../../bet/adapter/dto");
const dto_2 = require("../../app/dto");
const domain_1 = require("../../domain");
class BetCouponDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'bet id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BetCouponDTO.prototype, "bet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Les cotes avec les options', type: dto_1.OddsDto }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], BetCouponDTO.prototype, "couponBets", void 0);
exports.BetCouponDTO = BetCouponDTO;
class CouponAccountDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'user id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CouponAccountDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Les cotes avec les options', type: dto_2.BetCoupon }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CouponAccountDto.prototype, "couponBets", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'totalOdds',
        type: Number
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CouponAccountDto.prototype, "totalOdds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'amount',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CouponAccountDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'gains',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CouponAccountDto.prototype, "gains", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: domain_1.CouponState,
        name: 'etat',
        description: 'PERDU ou GAGNER ou PENDING',
    }),
    (0, class_validator_1.IsEnum)(domain_1.CouponState),
    __metadata("design:type", String)
], CouponAccountDto.prototype, "etat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        name: 'isDeleted',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CouponAccountDto.prototype, "isDeleted", void 0);
exports.CouponAccountDto = CouponAccountDto;
class UpdateCouponDTO extends (0, swagger_1.PartialType)(CouponAccountDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateCouponDTO.prototype, "id", void 0);
exports.UpdateCouponDTO = UpdateCouponDTO;
//# sourceMappingURL=coupon.input.dto.js.map