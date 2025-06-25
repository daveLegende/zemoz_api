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
exports.DocTournoiOutputDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DocTournoiOutputDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'id' }),
    __metadata("design:type", String)
], DocTournoiOutputDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'name',
        description: 'Nom du Tournoi',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocTournoiOutputDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'editionName',
        description: 'nom d\' édition',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DocTournoiOutputDTO.prototype, "editionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'edition',
        description: 'Quellième edition du Tournoi',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocTournoiOutputDTO.prototype, "edition", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        name: 'annee',
        description: 'Année du tournoi',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], DocTournoiOutputDTO.prototype, "annee", void 0);
exports.DocTournoiOutputDTO = DocTournoiOutputDTO;
//# sourceMappingURL=doc.tournoi.dto.js.map