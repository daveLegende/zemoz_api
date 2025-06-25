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
exports.UpdateParisDTO = exports.ParisAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class ParisAccountDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du match', example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ParisAccountDto.prototype, "match", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'odd', example: '1.2' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ParisAccountDto.prototype, "odd", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Option pariée',
        enum: ['V1', 'X', 'V2'],
        example: 'V1'
    }),
    (0, class_validator_1.IsEnum)(['V1', 'X', 'V2']),
    __metadata("design:type", String)
], ParisAccountDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Etat du pari',
        enum: ['Pending', 'Lost', 'Won'],
        example: 'Pending'
    }),
    (0, class_validator_1.IsEnum)(['Pending', 'Lost', 'Won']),
    __metadata("design:type", String)
], ParisAccountDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Montant misé', example: 100 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'La mise doit être au moins de 1' }),
    __metadata("design:type", Number)
], ParisAccountDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Montant gagné', example: 100 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'La mise doit être au moins de 1' }),
    __metadata("design:type", Number)
], ParisAccountDto.prototype, "potentialGain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'is won', example: 'true' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ParisAccountDto.prototype, "isWon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'is paid', example: 'false' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ParisAccountDto.prototype, "isPaid", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID de l\'utilisateur', example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], ParisAccountDto.prototype, "user", void 0);
exports.ParisAccountDto = ParisAccountDto;
class UpdateParisDTO extends (0, swagger_1.PartialType)(ParisAccountDto) {
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
], UpdateParisDTO.prototype, "id", void 0);
exports.UpdateParisDTO = UpdateParisDTO;
//# sourceMappingURL=paris.input.dto.js.map