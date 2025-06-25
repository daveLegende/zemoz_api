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
exports.DocTransactionOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const domain_1 = require("../../domain");
class DocTransactionOutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocTransactionOutputDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'amount',
        description: 'montant du ticket',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DocTransactionOutputDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'frais',
        description: 'Frais de pourcentage',
        required: true,
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DocTransactionOutputDto.prototype, "frais", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'DEPOT ou RETRAIT', enum: domain_1.TransactionType }),
    (0, class_validator_1.IsEnum)(domain_1.TransactionType),
    __metadata("design:type", String)
], DocTransactionOutputDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'phone du user', type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocTransactionOutputDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id de l\'admin', type: String }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocTransactionOutputDto.prototype, "admin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id de l\'user', type: String }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocTransactionOutputDto.prototype, "user", void 0);
exports.DocTransactionOutputDto = DocTransactionOutputDto;
//# sourceMappingURL=doc.transac.dto.js.map