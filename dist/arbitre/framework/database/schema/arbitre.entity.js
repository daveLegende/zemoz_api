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
exports.ArbitreEntity = void 0;
const domain_1 = require("../../../domain");
const match_entity_1 = require("../../../../match/framework/database/schema/match.entity");
const typeorm_1 = require("typeorm");
let ArbitreEntity = class ArbitreEntity extends domain_1.Arbitre {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ArbitreEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ArbitreEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], ArbitreEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ArbitreEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, enum: domain_1.RoleArbitre, default: domain_1.RoleArbitre.PRINCIPAL }),
    __metadata("design:type", String)
], ArbitreEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => match_entity_1.MatchEntity, (match) => match.arbitres),
    __metadata("design:type", Array)
], ArbitreEntity.prototype, "matchs", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ArbitreEntity.prototype, "deleteDate", void 0);
ArbitreEntity = __decorate([
    (0, typeorm_1.Entity)('arbitres')
], ArbitreEntity);
exports.ArbitreEntity = ArbitreEntity;
//# sourceMappingURL=arbitre.entity.js.map