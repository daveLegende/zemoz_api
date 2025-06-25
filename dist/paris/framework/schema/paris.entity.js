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
exports.ParisEntity = void 0;
const timestamp_abstract_1 = require("../../../_shared/framework/timestamp.abstract");
const match_entity_1 = require("../../../match/framework/database/schema/match.entity");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../user/framework/database/schema/user.entity");
let ParisEntity = class ParisEntity extends timestamp_abstract_1.ATimestamp {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ParisEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['V1', 'X', 'V2'],
    }),
    __metadata("design:type", String)
], ParisEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['Pending', 'Lost', 'Won'],
        default: 'Pending',
    }),
    __metadata("design:type", String)
], ParisEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], ParisEntity.prototype, "odd", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], ParisEntity.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], ParisEntity.prototype, "potentialGain", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => match_entity_1.MatchEntity, (match) => match.paris),
    __metadata("design:type", match_entity_1.MatchEntity)
], ParisEntity.prototype, "match", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.paris),
    __metadata("design:type", user_entity_1.UserEntity)
], ParisEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ParisEntity.prototype, "isWon", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ParisEntity.prototype, "isPaid", void 0);
ParisEntity = __decorate([
    (0, typeorm_1.Entity)('paris')
], ParisEntity);
exports.ParisEntity = ParisEntity;
//# sourceMappingURL=paris.entity.js.map