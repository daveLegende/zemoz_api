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
exports.DocTeamOutputDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DocTeamOutputDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'id' }),
    __metadata("design:type", String)
], DocTeamOutputDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'name',
        description: 'Nom de team',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocTeamOutputDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'coach',
        description: 'nom du coach',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocTeamOutputDTO.prototype, "coach", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'commune',
        description: 'Commune de team',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocTeamOutputDTO.prototype, "commune", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'points',
        description: 'Le points de team',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocTeamOutputDTO.prototype, "points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'matchJoues',
        description: 'Le nombre de match joués',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocTeamOutputDTO.prototype, "matchJoues", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'butMarques',
        description: 'Le nombre de buts marqués',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocTeamOutputDTO.prototype, "butMarques", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'butConcedes',
        description: 'Le nombre de buts concedés',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocTeamOutputDTO.prototype, "butConcedes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'binary', name: 'logo', required: false }),
    __metadata("design:type", String)
], DocTeamOutputDTO.prototype, "logo", void 0);
exports.DocTeamOutputDTO = DocTeamOutputDTO;
//# sourceMappingURL=doc.team.dto.js.map