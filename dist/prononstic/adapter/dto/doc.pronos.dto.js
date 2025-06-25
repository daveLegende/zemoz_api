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
exports.DocPrononsticOutputDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const domain_1 = require("../../domain");
class DocPrononsticOutputDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de Prononstic',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], DocPrononsticOutputDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'user',
        description: 'id de l\'user',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], DocPrononsticOutputDTO.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'match',
        description: 'id de l\'user',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], DocPrononsticOutputDTO.prototype, "match", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'homeScore',
        description: 'Score de l\équipe domicile',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DocPrononsticOutputDTO.prototype, "homeScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'awayScore',
        description: 'Score de l\équipe exterieure',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DocPrononsticOutputDTO.prototype, "awayScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        name: 'date',
        description: 'La date du prononstic',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], DocPrononsticOutputDTO.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type de match', enum: domain_1.PronoState }),
    (0, class_validator_1.IsEnum)(domain_1.PronoState),
    __metadata("design:type", String)
], DocPrononsticOutputDTO.prototype, "etat", void 0);
exports.DocPrononsticOutputDTO = DocPrononsticOutputDTO;
//# sourceMappingURL=doc.pronos.dto.js.map