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
exports.MatchEventService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../../match/domain");
const domain_2 = require("../../../team/domain");
const domain_3 = require("../../../player/domain");
const domain_4 = require("../../domain");
const match_events_factory_1 = require("../match.events.factory");
let MatchEventService = class MatchEventService {
    constructor(eventRepository, teamRepository, playerRepository, matchRepository) {
        this.eventRepository = eventRepository;
        this.teamRepository = teamRepository;
        this.playerRepository = playerRepository;
        this.matchRepository = matchRepository;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            return await this.eventRepository.events.find({
                relations: { match: true, joueur: true, equipe: true }
            });
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::MatchService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const match = await this.eventRepository.events.findOne({
                where: { id: id },
                relations: { match: true, joueur: true, equipe: true }
            });
            if (match) {
                return match;
            }
            throw new common_1.NotFoundException('Match not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::MatchService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.eventRepository.events.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            const { type, equipe, joueur, minute, match } = data;
            const newMatch = await this.matchRepository.matchs.findOne({
                where: { id: match },
                relations: { poule: true, arbitres: true, events: true }
            });
            const team = await this.teamRepository.teams.findOne({
                where: { id: equipe },
                relations: { poule: true }
            });
            const player = await this.playerRepository.players.findOne({
                where: { id: joueur },
                relations: { team: true }
            });
            if (!match) {
                throw new common_1.NotFoundException('Match non trouvé');
            }
            if (!team) {
                throw new common_1.NotFoundException('Equipe non trouvée');
            }
            if (!player) {
                throw new common_1.NotFoundException('Jopueur non trouvé');
            }
            return await this.eventRepository.events.create(await match_events_factory_1.MatchEventFactory.create(data, team, player, newMatch));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::MatchService.add');
            throw error;
        }
    }
    async edit(data) {
        try {
            const events = new domain_4.MatchEvent();
            return events;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::MatchService.editMatch');
            throw error;
        }
    }
    async setState(id) {
        return false;
    }
    async remove(id) {
        try {
            const match = await this.eventRepository.events.findOne(({
                where: { id: id },
            }));
            if (match) {
                return await this.eventRepository.events.remove(match).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::MatchService.remove');
            return false;
        }
    }
};
MatchEventService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [domain_4.IMatchEventRepository,
        domain_2.ITeamRepository,
        domain_3.IPlayerRepository,
        domain_1.IMatchRepository])
], MatchEventService);
exports.MatchEventService = MatchEventService;
//# sourceMappingURL=match.event.service.js.map