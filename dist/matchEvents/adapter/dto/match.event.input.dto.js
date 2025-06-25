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
exports.UpdateMatchEventDto = exports.MatchEventDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const domain_1 = require("../../../match/domain");
class MatchEventDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Id du match', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MatchEventDTO.prototype, "match", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type d\'événement du match (ex. : But, Carton rouge)', example: 'GOAL', type: domain_1.EventType }),
    (0, class_validator_1.IsEnum)(domain_1.EventType),
    __metadata("design:type", String)
], MatchEventDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'id de l\'equipe', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MatchEventDTO.prototype, "equipe", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'id du joueur', type: String }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MatchEventDTO.prototype, "joueur", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'minuite de events', type: Number }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], MatchEventDTO.prototype, "minute", void 0);
exports.MatchEventDTO = MatchEventDTO;
class UpdateMatchEventDto extends MatchEventDTO {
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
], UpdateMatchEventDto.prototype, "id", void 0);
exports.UpdateMatchEventDto = UpdateMatchEventDto;
//# sourceMappingURL=match.event.input.dto.js.map