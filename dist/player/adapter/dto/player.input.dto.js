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
exports.UpdatePlayerDTO = exports.PlayerAccoutDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class PlayerAccoutDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'firstname',
        description: 'Le nom de famille',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlayerAccoutDTO.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'lastname',
        description: 'Prenom du joueur',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlayerAccoutDTO.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'age',
        description: 'Age du joueur',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PlayerAccoutDTO.prototype, "age", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'phone',
        description: 'Le numero de téléphone du joueur',
    }),
    (0, class_validator_1.IsPhoneNumber)(),
    __metadata("design:type", String)
], PlayerAccoutDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'buts',
        description: 'Le nombre de buts marqué',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PlayerAccoutDTO.prototype, "buts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'passes',
        description: 'Le nombre de passes d',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PlayerAccoutDTO.prototype, "passes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'id de team',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], PlayerAccoutDTO.prototype, "team", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'binary', name: 'avatar' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PlayerAccoutDTO.prototype, "avatar", void 0);
exports.PlayerAccoutDTO = PlayerAccoutDTO;
class UpdatePlayerDTO extends (0, swagger_1.PartialType)(PlayerAccoutDTO) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID du joueur',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdatePlayerDTO.prototype, "id", void 0);
exports.UpdatePlayerDTO = UpdatePlayerDTO;
//# sourceMappingURL=player.input.dto.js.map