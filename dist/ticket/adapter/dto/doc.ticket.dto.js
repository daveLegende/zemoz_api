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
exports.DocTicketOutputDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const ticket_enum_1 = require("../../domain/ticket.enum");
class DocTicketOutputDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, name: 'id' }),
    __metadata("design:type", String)
], DocTicketOutputDTO.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'VIP ou STANDARD', enum: ticket_enum_1.TicketType }),
    (0, class_validator_1.IsEnum)(ticket_enum_1.TicketType),
    __metadata("design:type", String)
], DocTicketOutputDTO.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Abonnement ou simple', enum: ticket_enum_1.TicketDuration }),
    (0, class_validator_1.IsEnum)(ticket_enum_1.TicketDuration),
    __metadata("design:type", String)
], DocTicketOutputDTO.prototype, "duree", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'VALIDE ou UTILISER ou SUPPRIMER', enum: ticket_enum_1.TicketState }),
    (0, class_validator_1.IsEnum)(ticket_enum_1.TicketState),
    __metadata("design:type", String)
], DocTicketOutputDTO.prototype, "etat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'user',
        description: 'id de user',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocTicketOutputDTO.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        name: 'amount',
        description: 'montant du ticket',
        required: true,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], DocTicketOutputDTO.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        name: 'date',
        description: 'date du ticket',
    }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], DocTicketOutputDTO.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        name: 'match',
        description: 'id du match',
        nullable: true
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DocTicketOutputDTO.prototype, "match", void 0);
exports.DocTicketOutputDTO = DocTicketOutputDTO;
//# sourceMappingURL=doc.ticket.dto.js.map