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
exports.UpdateBetDTO = exports.BetAccountDto = exports.OddsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const domain_1 = require("../../domain");
class OddsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cote pour l’équipe V1', example: 1.2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OddsDto.prototype, "V1", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cote pour l’équipe V2', example: 5.0 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OddsDto.prototype, "V2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cote pour le match nul (X)', example: 2.5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OddsDto.prototype, "X", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cote pour les deux equipes marquent (OUI)', example: 2.5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OddsDto.prototype, "OUI", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cote pour les deux equipes marquent (NON)', example: 2.5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OddsDto.prototype, "NON", void 0);
exports.OddsDto = OddsDto;
class BetAccountDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: domain_1.CategoryName,
        name: 'category',
        description: 'VICTOIRE ou DEUX MARQUENT ou CARTON ROUGE',
    }),
    (0, class_validator_1.IsEnum)(domain_1.CategoryName),
    __metadata("design:type", String)
], BetAccountDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Les cotes avec les options', type: OddsDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OddsDto),
    __metadata("design:type", OddsDto)
], BetAccountDto.prototype, "odds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'match id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BetAccountDto.prototype, "match", void 0);
exports.BetAccountDto = BetAccountDto;
class UpdateBetDTO extends (0, swagger_1.PartialType)(BetAccountDto) {
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
], UpdateBetDTO.prototype, "id", void 0);
exports.UpdateBetDTO = UpdateBetDTO;
//# sourceMappingURL=bet.input.dto.js.map