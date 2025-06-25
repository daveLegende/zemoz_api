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
exports.TicketEntity = void 0;
const typeorm_1 = require("typeorm");
const timestamp_abstract_1 = require("../../../../_shared/framework/timestamp.abstract");
const ticket_enum_1 = require("../../../domain/ticket.enum");
const user_entity_1 = require("../../../../user/framework/database/schema/user.entity");
let TicketEntity = class TicketEntity extends timestamp_abstract_1.ATimestamp {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TicketEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ticket_enum_1.TicketType, default: ticket_enum_1.TicketType.STARNDARD }),
    __metadata("design:type", String)
], TicketEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ticket_enum_1.TicketDuration, default: ticket_enum_1.TicketDuration.SIMPLE }),
    __metadata("design:type", String)
], TicketEntity.prototype, "duree", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ticket_enum_1.TicketState, default: ticket_enum_1.TicketState.VALIDE }),
    __metadata("design:type", String)
], TicketEntity.prototype, "etat", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.tickets, { nullable: false }),
    __metadata("design:type", user_entity_1.UserEntity)
], TicketEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], TicketEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], TicketEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], TicketEntity.prototype, "lastScanDate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [] }),
    __metadata("design:type", Array)
], TicketEntity.prototype, "matchs", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], TicketEntity.prototype, "isDeleted", void 0);
TicketEntity = __decorate([
    (0, typeorm_1.Entity)('tickets')
], TicketEntity);
exports.TicketEntity = TicketEntity;
//# sourceMappingURL=ticket.entity.js.map