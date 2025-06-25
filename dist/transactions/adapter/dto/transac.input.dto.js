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
exports.UpdatePassDTO = exports.PassAccountDto = exports.UpdateTransactionDTO = exports.TransactionAccountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const domain_1 = require("../../domain");
class TransactionAccountDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'amount',
        description: 'montant du ticket',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TransactionAccountDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'frais',
        description: 'Frais de pourcentage',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TransactionAccountDto.prototype, "frais", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'DEPOT ou RETRAIT', enum: domain_1.TransactionType }),
    (0, class_validator_1.IsEnum)(domain_1.TransactionType),
    __metadata("design:type", String)
], TransactionAccountDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'phone du user', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionAccountDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id de l\'admin', type: String }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionAccountDto.prototype, "admin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id de l\'user', type: String }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionAccountDto.prototype, "user", void 0);
exports.TransactionAccountDto = TransactionAccountDto;
class UpdateTransactionDTO extends (0, swagger_1.PartialType)(TransactionAccountDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de la transaction',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateTransactionDTO.prototype, "id", void 0);
exports.UpdateTransactionDTO = UpdateTransactionDTO;
class PassAccountDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'pass',
        description: 'mot d passe',
        required: true,
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PassAccountDto.prototype, "pass", void 0);
exports.PassAccountDto = PassAccountDto;
class UpdatePassDTO extends (0, swagger_1.PartialType)(PassAccountDto) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de la transaction',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdatePassDTO.prototype, "id", void 0);
exports.UpdatePassDTO = UpdatePassDTO;
//# sourceMappingURL=transac.input.dto.js.map