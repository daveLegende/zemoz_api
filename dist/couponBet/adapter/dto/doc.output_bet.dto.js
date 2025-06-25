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
exports.DocCouponBetOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const dto_1 = require("../../../bet/adapter/dto");
class DocCouponBetOutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'bet id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocCouponBetOutputDto.prototype, "bet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'coupon id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocCouponBetOutputDto.prototype, "coupon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Les cotes avec les options', type: dto_1.OddsDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => dto_1.OddsDto),
    __metadata("design:type", dto_1.OddsDto)
], DocCouponBetOutputDto.prototype, "selectedOptions", void 0);
exports.DocCouponBetOutputDto = DocCouponBetOutputDto;
//# sourceMappingURL=doc.output_bet.dto.js.map