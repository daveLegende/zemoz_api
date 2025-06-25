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
exports.UpdateTicketDTO = exports.TicketAccoutDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ticket_enum_1 = require("../../domain/ticket.enum");
class TicketAccoutDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'VIP ou STANDARD', enum: ticket_enum_1.TicketType }),
    (0, class_validator_1.IsEnum)(ticket_enum_1.TicketType),
    __metadata("design:type", String)
], TicketAccoutDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Abonnement ou simple', enum: ticket_enum_1.TicketDuration }),
    (0, class_validator_1.IsEnum)(ticket_enum_1.TicketDuration),
    __metadata("design:type", String)
], TicketAccoutDTO.prototype, "duree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'VALIDE ou UTILISER ou SUPPRIMER', enum: ticket_enum_1.TicketState }),
    (0, class_validator_1.IsEnum)(ticket_enum_1.TicketState),
    __metadata("design:type", String)
], TicketAccoutDTO.prototype, "etat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'user',
        description: 'id de user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TicketAccoutDTO.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'amount',
        description: 'montant du ticket',
        required: true,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], TicketAccoutDTO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date d\'achat du ticket', type: Date, example: '2024-08-25T14:00:00Z' }),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TicketAccoutDTO.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Date du dernier scan', type: Date, nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], TicketAccoutDTO.prototype, "lastScanDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Array,
        name: 'matchs',
        description: 'id des matchs',
        default: []
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], TicketAccoutDTO.prototype, "matchs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Boolean,
        name: 'isDeleted',
        default: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TicketAccoutDTO.prototype, "isDeleted", void 0);
exports.TicketAccoutDTO = TicketAccoutDTO;
class UpdateTicketDTO extends (0, swagger_1.PartialType)(TicketAccoutDTO) {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'id',
        description: 'ID de Ticket',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], UpdateTicketDTO.prototype, "id", void 0);
exports.UpdateTicketDTO = UpdateTicketDTO;
//# sourceMappingURL=ticket.input.dto.js.map