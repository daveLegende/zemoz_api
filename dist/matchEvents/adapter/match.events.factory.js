"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchEventFactory = void 0;
const domain_1 = require("../domain");
class MatchEventFactory {
    static async create(data, equipe, joueur, match) {
        const events = new domain_1.MatchEvent();
        events.match = match;
        events.type = data.type;
        events.equipe = equipe;
        events.joueur = joueur;
        events.minute = data.minute;
        return events;
    }
    static update(events, data, equipe, joueur) {
        var _a, _b;
        events.type = (_a = data.type) !== null && _a !== void 0 ? _a : events.type;
        events.equipe = equipe !== null && equipe !== void 0 ? equipe : events.equipe;
        events.joueur = joueur !== null && joueur !== void 0 ? joueur : events.joueur;
        events.minute = (_b = data.minute) !== null && _b !== void 0 ? _b : events.minute;
        return events;
    }
    static getMatch(events) {
        if (events) {
            return {
                id: events.id,
                match: events.match,
                type: events.type,
                equipe: events.equipe,
                joueur: events.joueur,
                minute: events.minute,
                createdAt: events.createdAt,
                updatedAt: events.updatedAt,
                deletedAt: events.deletedAt
            };
        }
    }
}
exports.MatchEventFactory = MatchEventFactory;
//# sourceMappingURL=match.events.factory.js.map