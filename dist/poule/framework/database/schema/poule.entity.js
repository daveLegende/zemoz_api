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
exports.PouleEntity = void 0;
const match_entity_1 = require("../../../../match/framework/database/schema/match.entity");
const domain_1 = require("../../../domain");
const team_entity_1 = require("../../../../team/framework/database/schema/team.entity");
const typeorm_1 = require("typeorm");
let PouleEntity = class PouleEntity extends domain_1.Poule {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PouleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PouleEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_entity_1.TeamEntity, (team) => team.poule),
    __metadata("design:type", Array)
], PouleEntity.prototype, "equipes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => match_entity_1.MatchEntity, (match) => match.poule),
    __metadata("design:type", Array)
], PouleEntity.prototype, "matches", void 0);
PouleEntity = __decorate([
    (0, typeorm_1.Entity)('poules')
], PouleEntity);
exports.PouleEntity = PouleEntity;
//# sourceMappingURL=poule.entity.js.map