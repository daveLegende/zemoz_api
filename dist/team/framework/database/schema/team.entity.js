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
exports.TeamEntity = void 0;
const typeorm_1 = require("typeorm");
const timestamp_abstract_1 = require("../../../../_shared/framework/timestamp.abstract");
const player_entity_1 = require("../../../../player/framework/database/schema/player.entity");
const poule_entity_1 = require("../../../../poule/framework/database/schema/poule.entity");
const match_entity_1 = require("../../../../match/framework/database/schema/match.entity");
let TeamEntity = class TeamEntity extends timestamp_abstract_1.ATimestamp {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TeamEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "coach", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TeamEntity.prototype, "commune", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], TeamEntity.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], TeamEntity.prototype, "matchJoues", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], TeamEntity.prototype, "butMarques", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], TeamEntity.prototype, "butConcedes", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], TeamEntity.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => player_entity_1.PlayerEntity, (player) => player.team),
    __metadata("design:type", Array)
], TeamEntity.prototype, "joueurs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => poule_entity_1.PouleEntity, (poule) => poule.equipes, { nullable: true }),
    __metadata("design:type", poule_entity_1.PouleEntity)
], TeamEntity.prototype, "poule", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => match_entity_1.MatchEntity, (match) => match.home),
    __metadata("design:type", Array)
], TeamEntity.prototype, "matchHome", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => match_entity_1.MatchEntity, (match) => match.away),
    __metadata("design:type", Array)
], TeamEntity.prototype, "matchAway", void 0);
TeamEntity = __decorate([
    (0, typeorm_1.Entity)('teams')
], TeamEntity);
exports.TeamEntity = TeamEntity;
//# sourceMappingURL=team.entity.js.map