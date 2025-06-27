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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const domain_1 = require("../../domain");
const match_factory_1 = require("../match.factory");
const domain_2 = require("../../../arbitre/domain");
const domain_3 = require("../../../team/domain");
const domain_4 = require("../../../poule/domain");
const domain_5 = require("../../../player/domain");
const domain_6 = require("../../../matchEvents/domain");
const match_gateway_1 = require("./match.gateway");
let MatchService = class MatchService {
    constructor(matchRepository, arbitreRepository, teamRepository, pouleRepository, playerRepository, eventRepository, matchGateway) {
        this.matchRepository = matchRepository;
        this.arbitreRepository = arbitreRepository;
        this.teamRepository = teamRepository;
        this.pouleRepository = pouleRepository;
        this.playerRepository = playerRepository;
        this.eventRepository = eventRepository;
        this.matchGateway = matchGateway;
        this.logger = new common_1.Logger();
    }
    async fetchAll() {
        try {
            const matches = await this.matchRepository.matchs.find({
                relations: {
                    home: true,
                    away: true,
                    arbitres: true,
                    events: { joueur: true, equipe: true },
                    bets: { match: { home: true, away: true } }
                }
            });
            return matches.map(match => this.addFullImageUrls(match));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::MatchService.fetchAll');
            throw error;
        }
    }
    async fetchOne(id) {
        try {
            const match = await this.matchRepository.matchs.findOne({
                where: { id: id },
                relations: {
                    home: true,
                    away: true,
                    arbitres: true,
                    bets: { match: true },
                    events: { joueur: true, equipe: true }
                }
            });
            if (match) {
                return this.addFullImageUrls(match);
            }
            throw new common_1.NotFoundException('Match not found');
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::MatchService.fetchOne');
            throw error;
        }
    }
    async search(data) {
        return await this.matchRepository.matchs.findOneBy(Object.assign({}, data));
    }
    async add(data) {
        try {
            console.log('Données reçues :', data);
            const { away, home, arbitres, type, odds, poule } = data;
            console.log("referee   ----------------" + data);
            const referee = await this.arbitreRepository.arbitres.findByIds(arbitres);
            const domicile = await this.teamRepository.teams.findOne({
                where: { id: home },
                relations: { poule: true }
            });
            const exterieure = await this.teamRepository.teams.findOne({
                where: { id: away },
                relations: { poule: true }
            });
            console.log("referee   ----------------" + data.home);
            if (!domicile || !exterieure) {
                throw new common_1.NotFoundException('L\'une des équipes spécifiées est introuvable.');
            }
            if (type === domain_1.MatchType.POULE) {
                if (!domicile.poule || !exterieure.poule) {
                    throw new common_1.NotFoundException("L'une des équipes n'a pas de poule associée.");
                }
                else {
                    if (domicile.poule.id === exterieure.poule.id) {
                        const match = await this.matchRepository.matchs.create(await match_factory_1.MatchFactory.create(data, referee, domicile, exterieure, domicile.poule));
                        return await this.matchRepository.save(match);
                    }
                    else {
                        throw new common_1.NotFoundException("Les équipes ne sont pas dans la même poule", 'ERROR::MatchService.editMatch');
                    }
                }
            }
            else {
                const match = await this.matchRepository.matchs.create(await match_factory_1.MatchFactory.create(data, referee, domicile, exterieure, null));
                return await this.matchRepository.save(match);
            }
            ;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::MatchService.add');
            throw error;
        }
    }
    addFullImageUrls(match) {
        const baseUrl = process.env.BASE_URL || 'http://localhost:3333';
        const uploadPath = process.env.UPLOAD_PATH || '/api/v1/files';
        if (match.arbitres && match.arbitres.length > 0) {
            match.arbitres = match.arbitres.map(arbitre => (Object.assign(Object.assign({}, arbitre), { avatar: arbitre.avatar ? `${baseUrl}/${uploadPath}/${arbitre.avatar}` : null })));
        }
        if (match.home && match.home.logo) {
            match.home = Object.assign(Object.assign({}, match.home), { logo: `${baseUrl}/${uploadPath}/${match.home.logo}` });
        }
        if (match.away && match.away.logo) {
            match.away = Object.assign(Object.assign({}, match.away), { logo: `${baseUrl}/${uploadPath}/${match.away.logo}` });
        }
        return match;
    }
    async edit(data) {
        try {
            const { id, home, away, arbitres, date, type } = data;
            const match = id && (await this.matchRepository.matchs.findOne({
                where: { id: id },
                relations: { home: true, away: true, arbitres: true, poule: true, events: { joueur: true, equipe: true } }
            }));
            if (match) {
                const domicile = await this.teamRepository.teams.findOne({
                    where: { id: home },
                    relations: { poule: true }
                });
                const exterieure = await this.teamRepository.teams.findOne({
                    where: { id: away },
                    relations: { poule: true }
                });
                const referee = await this.arbitreRepository.arbitres.findByIds(arbitres);
                return await this.matchRepository.matchs.update(match_factory_1.MatchFactory.update(match, data, referee, domicile, exterieure));
            }
            throw new common_1.NotFoundException();
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
            const match = await this.matchRepository.matchs.findOne(({
                where: { id: id },
                relations: { home: true, away: true, arbitres: true, poule: true, events: { joueur: true, equipe: true } }
            }));
            if (match) {
                return await this.matchRepository.matchs.remove(match).then(() => true);
            }
            return false;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::MatchService.remove');
            return false;
        }
    }
    async updateScore(data) {
        try {
            const { id, homeScore, awayScore, eventType, teamId, playerId, minuite } = data;
            if (minuite === undefined || minuite === null) {
                throw new common_1.BadRequestException('Minute must be provided');
            }
            const match = await this.matchRepository.matchs.findOne({
                where: { id: id },
                relations: { home: true, away: true, arbitres: true, events: { joueur: true, equipe: true } }
            });
            const home = await this.teamRepository.teams.findOne({
                where: { id: match.home.id },
                relations: { poule: true }
            });
            const away = await this.teamRepository.teams.findOne({
                where: { id: match.away.id },
                relations: { poule: true }
            });
            const player = await this.playerRepository.players.findOne({
                where: { id: playerId },
                relations: { team: true }
            });
            const events = new domain_6.MatchEvent();
            if (!match) {
                throw new common_1.NotFoundException();
            }
            if (eventType === domain_1.EventType.BUT) {
                if (home.id === teamId) {
                    match.scores.home = homeScore !== null && homeScore !== void 0 ? homeScore : match.scores.home;
                    events.equipe = home;
                    player.buts += 1;
                    events.joueur = player;
                    events.type = eventType;
                    events.minute = minuite;
                    match.events = [...match.events, events];
                }
                else {
                    match.scores.away = awayScore !== null && awayScore !== void 0 ? awayScore : match.scores.away;
                    events.equipe = away;
                    player.buts += 1;
                    events.joueur = player;
                    events.type = eventType;
                    events.minute = minuite;
                    match.events = [...match.events, events];
                }
            }
            else if (eventType === domain_1.EventType.CARTON_JAUNE) {
                if (home.id === teamId) {
                    events.equipe = home;
                    events.joueur = player;
                    events.type = eventType;
                    events.minute = minuite;
                    match.events = [...match.events, events];
                }
                else {
                    match.scores.away = awayScore !== null && awayScore !== void 0 ? awayScore : match.scores.away;
                    events.equipe = away;
                    events.joueur = player;
                    events.type = eventType;
                    events.minute = minuite;
                    match.events = [...match.events, events];
                }
            }
            else {
                if (home.id === teamId) {
                    events.equipe = home;
                    events.joueur = player;
                    events.type = eventType;
                    events.minute = minuite;
                    match.events = [...match.events, events];
                }
                else {
                    match.scores.away = awayScore !== null && awayScore !== void 0 ? awayScore : match.scores.away;
                    events.equipe = away;
                    events.joueur = player;
                    events.type = eventType;
                    events.minute = minuite;
                    match.events = [...match.events, events];
                }
            }
            await this.playerRepository.players.update(player);
            const matchUpdated = await this.matchRepository.matchs.update(match_factory_1.MatchFactory.updateScore(match, data));
            this.matchGateway.server.emit('scoreUpdated', matchUpdated);
            return matchUpdated;
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::MatchService.updateScore');
            throw error;
        }
    }
    async updateState(data) {
        try {
            const { id, etat } = data;
            const match = await this.matchRepository.matchs.findOne({
                where: { id: id },
                relations: { home: true, away: true, arbitres: true, poule: true, events: true },
            });
            if (!match) {
                throw new common_1.NotFoundException('Match not found');
            }
            const home = await this.teamRepository.teams.findOne({
                where: { id: match.home.id },
                relations: { poule: true },
            });
            const away = await this.teamRepository.teams.findOne({
                where: { id: match.away.id },
                relations: { poule: true },
            });
            if (match.etat === domain_1.MatchState.A_VENIR) {
                match.etat = domain_1.MatchState.EN_COURS;
            }
            else if (match.etat === domain_1.MatchState.EN_COURS) {
                match.etat = domain_1.MatchState.TERMINER;
                home.butMarques += match.scores.home;
                home.butConcedes += match.scores.away;
                away.butMarques += match.scores.away;
                away.butConcedes += match.scores.home;
                home.matchJoues += 1;
                away.matchJoues += 1;
                if (match.poule) {
                    if (match.scores.home > match.scores.away) {
                        home.points += 3;
                    }
                    else if (match.scores.home < match.scores.away) {
                        away.points += 3;
                    }
                    else {
                        home.points += 1;
                        away.points += 1;
                    }
                }
                if (match.type === domain_1.MatchType.HUITIEME || match.type === domain_1.MatchType.QUART || match.type === domain_1.MatchType.DEMI || match.type === domain_1.MatchType.FINALE) {
                    if (match.scores.home === match.scores.away) {
                        match.isProlongation = true;
                        match.teamQualify = null;
                    }
                    else {
                        match.isProlongation = false;
                        match.teamQualify = match.scores.home > match.scores.away ? match.home.id : match.away.id;
                    }
                }
                await this.teamRepository.teams.update(home);
                await this.teamRepository.teams.update(away);
            }
            return await this.matchRepository.matchs.update(match_factory_1.MatchFactory.updateState(match, data));
        }
        catch (error) {
            this.logger.error(error.message, 'ERROR::MatchService.updateState');
            throw error;
        }
    }
};
MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => match_gateway_1.MatchGateway))),
    __metadata("design:paramtypes", [domain_1.IMatchRepository,
        domain_2.IArbitreRepository,
        domain_3.ITeamRepository,
        domain_4.IPouleRepository,
        domain_5.IPlayerRepository,
        domain_6.IMatchEventRepository,
        match_gateway_1.MatchGateway])
], MatchService);
exports.MatchService = MatchService;
//# sourceMappingURL=match.service.js.map