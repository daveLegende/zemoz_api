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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const timestamp_abstract_1 = require("../../../../_shared/framework/timestamp.abstract");
const domain_1 = require("../../../domain");
const prono_entity_1 = require("../../../../prononstic/framework/database/schema/prono.entity");
const ticket_entity_1 = require("../../../../ticket/framework/database/schema/ticket.entity");
const coupon_entity_1 = require("../../../../coupon/framework/schema/coupon.entity");
const paris_entity_1 = require("../../../../paris/framework/schema/paris.entity");
let UserEntity = class UserEntity extends timestamp_abstract_1.ATimestamp {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "solde", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, enum: domain_1.SexEnum }),
    __metadata("design:type", String)
], UserEntity.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActivated", void 0);
__decorate([
    (0, class_transformer_1.Exclude)({ toClassOnly: true }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "askForReset", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prono_entity_1.PrononsticEntity, pronostic => pronostic.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "pronostics", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.TicketEntity, (ticket) => ticket.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => coupon_entity_1.CouponEntity, (coupon) => coupon.user, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], UserEntity.prototype, "bets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paris_entity_1.ParisEntity, (paris) => paris.user, { nullable: true, onDelete: 'CASCADE' }),
    __metadata("design:type", Array)
], UserEntity.prototype, "paris", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('user'),
    (0, typeorm_1.Index)(['email'], { unique: true, where: `deleted_at IS NULL` })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map