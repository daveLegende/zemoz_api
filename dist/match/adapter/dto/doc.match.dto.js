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
exports.MatchDocOutputDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const domain_1 = require("../../domain");
const domain_2 = require("../../../matchEvents/domain");
const domain_3 = require("../../../poule/domain");
const domain_4 = require("../../../team/domain");
const odds_dto_1 = require("./odds.dto");
class MatchDocOutputDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identifiant du match', example: '123e4567-e89b-12d3-a456-426614174000' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MatchDocOutputDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lieu du match', example: 'Stade Municipal' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MatchDocOutputDTO.prototype, "lieu", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type de match', enum: domain_1.MatchType }),
    (0, class_validator_1.IsEnum)(domain_1.MatchType),
    __metadata("design:type", String)
], MatchDocOutputDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'État du match', enum: domain_1.MatchState, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(domain_1.MatchState),
    __metadata("design:type", String)
], MatchDocOutputDTO.prototype, "etat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Numéro de la journée', example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], MatchDocOutputDTO.prototype, "journee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date du match', example: '2024-08-25T14:00:00Z' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], MatchDocOutputDTO.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Équipe à domicile', type: domain_4.Team }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => domain_4.Team),
    __metadata("design:type", domain_4.Team)
], MatchDocOutputDTO.prototype, "home", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Équipe à l\'extérieur', type: domain_4.Team }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => domain_4.Team),
    __metadata("design:type", domain_4.Team)
], MatchDocOutputDTO.prototype, "away", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Scores du match', type: domain_1.MatchScores, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => domain_1.MatchScores),
    __metadata("design:type", domain_1.MatchScores)
], MatchDocOutputDTO.prototype, "scores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Événements du match', type: [domain_2.MatchEvent], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => domain_2.MatchEvent),
    __metadata("design:type", Array)
], MatchDocOutputDTO.prototype, "events", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Poule du match', type: domain_3.Poule, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => domain_3.Poule),
    __metadata("design:type", domain_3.Poule)
], MatchDocOutputDTO.prototype, "poule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Si il y a prolongation ou tirs aux buts', type: Boolean }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MatchDocOutputDTO.prototype, "isProlongation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id de team qui est qualifiée', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MatchDocOutputDTO.prototype, "teamQualify", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'les cotes du match', type: odds_dto_1.OddsDTO }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => odds_dto_1.OddsDTO),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", odds_dto_1.OddsDTO)
], MatchDocOutputDTO.prototype, "odds", void 0);
exports.MatchDocOutputDTO = MatchDocOutputDTO;
//# sourceMappingURL=doc.match.dto.js.map