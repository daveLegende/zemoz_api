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
exports.UpdateOddsStateDto = exports.UpdateMatchScoreEventDto = exports.UpdateStateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const domain_1 = require("../../domain");
const odds_dto_1 = require("./odds.dto");
const class_transformer_1 = require("class-transformer");
class UpdateStateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de Match',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateStateDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'État du match', enum: domain_1.MatchState, required: true }),
    (0, class_validator_1.IsEnum)(domain_1.MatchState),
    __metadata("design:type", String)
], UpdateStateDto.prototype, "etat", void 0);
exports.UpdateStateDto = UpdateStateDto;
class UpdateMatchScoreEventDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de Match',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateMatchScoreEventDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de team',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateMatchScoreEventDto.prototype, "teamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de player',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateMatchScoreEventDto.prototype, "playerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'minuite',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateMatchScoreEventDto.prototype, "minuite", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'type event', type: domain_1.EventType }),
    (0, class_validator_1.IsEnum)(domain_1.EventType),
    __metadata("design:type", String)
], UpdateMatchScoreEventDto.prototype, "eventType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'homeScore',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateMatchScoreEventDto.prototype, "homeScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'awayScore',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateMatchScoreEventDto.prototype, "awayScore", void 0);
exports.UpdateMatchScoreEventDto = UpdateMatchScoreEventDto;
class UpdateOddsStateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'les cotes du match', type: odds_dto_1.OddsDTO }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => odds_dto_1.OddsDTO),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", odds_dto_1.OddsDTO)
], UpdateOddsStateDto.prototype, "odds", void 0);
exports.UpdateOddsStateDto = UpdateOddsStateDto;
//# sourceMappingURL=update.state.dto.js.map