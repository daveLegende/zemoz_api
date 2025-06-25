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
exports.DocArbitreOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const domain_1 = require("../../domain");
class DocArbitreOutputDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocArbitreOutputDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'nom de la Arbitre',
        description: 'Nom complet: AKAKPO Bertin',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocArbitreOutputDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'binary', name: 'avatar' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DocArbitreOutputDto.prototype, "avatar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'phone',
        description: 'Numéro de téléphone',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocArbitreOutputDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, enum: domain_1.RoleArbitre, name: 'role', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(domain_1.RoleArbitre),
    __metadata("design:type", String)
], DocArbitreOutputDto.prototype, "role", void 0);
exports.DocArbitreOutputDto = DocArbitreOutputDto;
//# sourceMappingURL=doc.arbitre.output.js.map