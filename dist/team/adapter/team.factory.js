"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamFactory = void 0;
const domain_1 = require("../domain");
class TeamFactory {
    static async create(data) {
        const team = new domain_1.Team();
        team.name = data.name;
        team.logo = data.logo;
        team.coach = data.coach;
        team.commune = data.commune;
        team.points = data.points;
        team.matchJoues = data.matchJoues;
        team.butMarques = data.butMarques;
        team.butConcedes = data.butConcedes;
        team.joueurs = data.joueurs;
        return team;
    }
    static update(team, data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        team.name = (_a = data.name) !== null && _a !== void 0 ? _a : team.name;
        team.logo = (_b = data.logo) !== null && _b !== void 0 ? _b : team.logo;
        team.coach = (_c = data.coach) !== null && _c !== void 0 ? _c : team.coach;
        team.commune = (_d = data.commune) !== null && _d !== void 0 ? _d : team.commune;
        team.points = (_e = data.points) !== null && _e !== void 0 ? _e : team.points;
        team.matchJoues = (_f = data.matchJoues) !== null && _f !== void 0 ? _f : team.matchJoues;
        team.butMarques = (_g = data.butMarques) !== null && _g !== void 0 ? _g : team.butMarques;
        team.butConcedes = (_h = data.butConcedes) !== null && _h !== void 0 ? _h : team.butConcedes;
        team.joueurs = (_j = data.joueurs) !== null && _j !== void 0 ? _j : team.joueurs;
        return team;
    }
    static getFileLink(file) {
        if (file) {
            return `${process.env.APP_BASE_URL}/files/${file}`;
        }
    }
    static getTeam(team) {
        if (team) {
            return {
                id: team.id,
                name: team.name,
                coach: team.coach,
                commune: team.commune,
                points: team.points,
                butMarques: team.butMarques,
                butConcedes: team.butConcedes,
                matchJoues: team.matchJoues,
                joueurs: team.joueurs,
                logo: this.getFileLink(team.logo),
                poule: team.poule,
                createdAt: team.createdAt,
                updatedAt: team.updatedAt,
                deletedAt: team.deletedAt
            };
        }
    }
}
exports.TeamFactory = TeamFactory;
//# sourceMappingURL=team.factory.js.map