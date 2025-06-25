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
exports.MatchEntity = void 0;
const typeorm_1 = require("typeorm");
const timestamp_abstract_1 = require("../../../../_shared/framework/timestamp.abstract");
const domain_1 = require("../../../domain");
const poule_entity_1 = require("../../../../poule/framework/database/schema/poule.entity");
const team_entity_1 = require("../../../../team/framework/database/schema/team.entity");
const arbitre_entity_1 = require("../../../../arbitre/framework/database/schema/arbitre.entity");
const match_event_entity_1 = require("../../../../matchEvents/framework/database/schema/match.event.entity");
const prono_entity_1 = require("../../../../prononstic/framework/database/schema/prono.entity");
const bet_entity_1 = require("../../../../bet/framework/schema/bet.entity");
const paris_entity_1 = require("../../../../paris/framework/schema/paris.entity");
let MatchEntity = class MatchEntity extends timestamp_abstract_1.ATimestamp {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MatchEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MatchEntity.prototype, "lieu", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: domain_1.MatchType,
    }),
    __metadata("design:type", String)
], MatchEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: domain_1.MatchState,
        nullable: true,
        default: domain_1.MatchState.A_VENIR
    }),
    __metadata("design:type", String)
], MatchEntity.prototype, "etat", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 0 }),
    __metadata("design:type", Number)
], MatchEntity.prototype, "journee", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    __metadata("design:type", Date)
], MatchEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.TeamEntity, (team) => team.matchHome, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'home' }),
    __metadata("design:type", team_entity_1.TeamEntity)
], MatchEntity.prototype, "home", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.TeamEntity, (team) => team.matchAway, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'away' }),
    __metadata("design:type", team_entity_1.TeamEntity)
], MatchEntity.prototype, "away", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true, default: { "home": 0, "away": 0 } }),
    __metadata("design:type", domain_1.MatchScores)
], MatchEntity.prototype, "scores", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => match_event_entity_1.MatchEventEntity, (event) => event.match, { cascade: true }),
    __metadata("design:type", Array)
], MatchEntity.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => poule_entity_1.PouleEntity, (poule) => poule.matches, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'poule' }),
    __metadata("design:type", poule_entity_1.PouleEntity)
], MatchEntity.prototype, "poule", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => arbitre_entity_1.ArbitreEntity, (arbitre) => arbitre.matchs),
    (0, typeorm_1.JoinTable)({ name: "matchs_arbitres" }),
    __metadata("design:type", Array)
], MatchEntity.prototype, "arbitres", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => prono_entity_1.PrononsticEntity, pronostic => pronostic.match),
    __metadata("design:type", Array)
], MatchEntity.prototype, "pronostics", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bet_entity_1.BetEntity, (bet) => bet.match),
    __metadata("design:type", Array)
], MatchEntity.prototype, "bets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => paris_entity_1.ParisEntity, (paris) => paris.match),
    __metadata("design:type", Array)
], MatchEntity.prototype, "paris", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: false }),
    __metadata("design:type", Boolean)
], MatchEntity.prototype, "isProlongation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], MatchEntity.prototype, "teamQualify", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', {
        nullable: true,
        default: { V1: 1.0, X: 1.0, V2: 1.0 }
    }),
    __metadata("design:type", Object)
], MatchEntity.prototype, "odds", void 0);
MatchEntity = __decorate([
    (0, typeorm_1.Entity)('matchs')
], MatchEntity);
exports.MatchEntity = MatchEntity;
//# sourceMappingURL=match.entity.js.map