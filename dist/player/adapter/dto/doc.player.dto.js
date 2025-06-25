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
exports.DocPlayerOutputDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DocPlayerOutputDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'id' }),
    __metadata("design:type", String)
], DocPlayerOutputDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'firstname',
        description: 'Le nom de famille',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocPlayerOutputDTO.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'lastname',
        description: 'Prenom du joueur',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocPlayerOutputDTO.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'age',
        description: 'Age du joueur',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocPlayerOutputDTO.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'phone',
        description: 'Le numero de téléphone du joueur',
    }),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], DocPlayerOutputDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'buts',
        description: 'Le nombre de buts marqué',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocPlayerOutputDTO.prototype, "buts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'passes',
        description: 'Le nombre de passes d',
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocPlayerOutputDTO.prototype, "passes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'binary', name: 'avatar' }),
    __metadata("design:type", String)
], DocPlayerOutputDTO.prototype, "avatar", void 0);
exports.DocPlayerOutputDTO = DocPlayerOutputDTO;
//# sourceMappingURL=doc.player.dto.js.map