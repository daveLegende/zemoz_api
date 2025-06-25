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
exports.DocCouponOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const domain_1 = require("../../domain");
class DocCouponOutputDto {
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
], DocCouponOutputDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'user id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocCouponOutputDto.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Array,
        name: 'Coupons id',
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], DocCouponOutputDto.prototype, "Coupons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'les cotes avec les options', type: Number }),
    __metadata("design:type", Number)
], DocCouponOutputDto.prototype, "totalOdds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'amount',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DocCouponOutputDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'gains',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DocCouponOutputDto.prototype, "gains", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: domain_1.CouponState,
        name: 'etat',
        description: 'PERDU ou GAGNER ou PENDING',
    }),
    (0, class_validator_1.IsEnum)(domain_1.CouponState),
    __metadata("design:type", String)
], DocCouponOutputDto.prototype, "etat", void 0);
exports.DocCouponOutputDto = DocCouponOutputDto;
//# sourceMappingURL=doc.output.dto.js.map