"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchFactory = void 0;
const domain_1 = require("../domain");
class MatchFactory {
    static async create(data, referees, home, away, poule) {
        const match = new domain_1.Match();
        match.type = data.type;
        match.lieu = data.lieu;
        match.date = data.date;
        match.etat = data.etat;
        match.isProlongation = data.isProlongation;
        match.teamQualify = data.teamQualify;
        match.arbitres = referees;
        match.home = home;
        match.away = away;
        match.journee = data.journee;
        match.events = data.events;
        match.poule = poule;
        if (data.odds) {
            match.odds = {
                V1: data.odds.V1,
                X: data.odds.X,
                V2: data.odds.V2,
            };
        }
        console.log(match.away);
        return match;
    }
    static update(match, data, referees, home, away) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        match.type = (_a = data.type) !== null && _a !== void 0 ? _a : match.type;
        match.lieu = (_b = data.lieu) !== null && _b !== void 0 ? _b : match.lieu;
        match.etat = (_c = data.etat) !== null && _c !== void 0 ? _c : match.etat;
        match.date = (_d = data.date) !== null && _d !== void 0 ? _d : match.date;
        match.arbitres = referees !== null && referees !== void 0 ? referees : match.arbitres;
        match.away = away !== null && away !== void 0 ? away : match.away;
        match.home = home !== null && home !== void 0 ? home : match.home;
        match.journee = (_e = data.journee) !== null && _e !== void 0 ? _e : match.journee;
        match.isProlongation = (_f = data.isProlongation) !== null && _f !== void 0 ? _f : match.isProlongation;
        match.teamQualify = (_g = data.teamQualify) !== null && _g !== void 0 ? _g : match.teamQualify;
        match.events = (_h = data.events) !== null && _h !== void 0 ? _h : match.events;
        match.scores = match.scores;
        match.poule = match.poule;
        match.odds = (_j = data.odds) !== null && _j !== void 0 ? _j : match.odds;
        return match;
    }
    static updateScore(match, data) {
        var _a, _b;
        match.scores.home = (_a = data.homeScore) !== null && _a !== void 0 ? _a : match.scores.home;
        match.scores.away = (_b = data.awayScore) !== null && _b !== void 0 ? _b : match.scores.away;
        return match;
    }
    static updateState(match, data) {
        return match;
    }
    static updateOdds(match, data) {
        var _a;
        match.odds = (_a = data.odds) !== null && _a !== void 0 ? _a : match.odds;
        return match;
    }
    static getMatch(match) {
        if (match) {
            return {
                id: match.id,
                type: match.type,
                lieu: match.lieu,
                etat: match.etat,
                journee: match.journee,
                date: match.date,
                arbitres: match.arbitres,
                away: match.away,
                home: match.home,
                scores: match.scores,
                events: match.events,
                bets: match.bets,
                poule: match.poule,
                isProlongation: match.isProlongation,
                teamQualify: match.teamQualify,
                odds: match.odds,
                createdAt: match.createdAt,
                updatedAt: match.updatedAt,
                deletedAt: match.deletedAt
            };
        }
    }
}
exports.MatchFactory = MatchFactory;
//# sourceMappingURL=match.factory.js.map