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
exports.MatchEventEntity = void 0;
const match_entity_1 = require("../../../../match/framework/database/schema/match.entity");
const domain_1 = require("../../../domain");
const player_entity_1 = require("../../../../player/framework/database/schema/player.entity");
const team_entity_1 = require("../../../../team/framework/database/schema/team.entity");
const typeorm_1 = require("typeorm");
let MatchEventEntity = class MatchEventEntity extends domain_1.MatchEvent {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MatchEventEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MatchEventEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.TeamEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'teamId' }),
    __metadata("design:type", team_entity_1.TeamEntity)
], MatchEventEntity.prototype, "equipe", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => player_entity_1.PlayerEntity, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'playerId' }),
    __metadata("design:type", player_entity_1.PlayerEntity)
], MatchEventEntity.prototype, "joueur", void 0);
__decorate([
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], MatchEventEntity.prototype, "minute", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => match_entity_1.MatchEntity, (match) => match.events),
    (0, typeorm_1.JoinColumn)({ name: 'matchId' }),
    __metadata("design:type", match_entity_1.MatchEntity)
], MatchEventEntity.prototype, "match", void 0);
MatchEventEntity = __decorate([
    (0, typeorm_1.Entity)('match_events')
], MatchEventEntity);
exports.MatchEventEntity = MatchEventEntity;
//# sourceMappingURL=match.event.entity.js.map