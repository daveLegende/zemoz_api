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
exports.UpdateTeamDTO = exports.TeamAccoutDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const domain_1 = require("../../../player/domain");
class TeamAccoutDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'name',
        description: 'Nom de team',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamAccoutDTO.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'coach',
        description: 'nom du coach',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamAccoutDTO.prototype, "coach", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'commune',
        description: 'Commune de team',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamAccoutDTO.prototype, "commune", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'points',
        description: 'Le points de team',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TeamAccoutDTO.prototype, "points", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'matchJoues',
        description: 'Le nombre de match joués',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TeamAccoutDTO.prototype, "matchJoues", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'butMarques',
        description: 'Le nombre de buts marqués',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TeamAccoutDTO.prototype, "butMarques", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'butConcedes',
        description: 'Le nombre de buts concedés',
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TeamAccoutDTO.prototype, "butConcedes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: domain_1.Player,
        isArray: true,
        name: 'joueurs',
        description: 'Les joueurs de l\'équipe',
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], TeamAccoutDTO.prototype, "joueurs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, format: 'binary', name: 'logo', required: false }),
    __metadata("design:type", String)
], TeamAccoutDTO.prototype, "logo", void 0);
exports.TeamAccoutDTO = TeamAccoutDTO;
class UpdateTeamDTO extends (0, swagger_1.PartialType)(TeamAccoutDTO) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de team',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateTeamDTO.prototype, "id", void 0);
exports.UpdateTeamDTO = UpdateTeamDTO;
//# sourceMappingURL=team.input.dto.js.map