"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrononsticFactory = void 0;
const domain_1 = require("../domain");
class PrononsticFactory {
    static async create(data, user, match) {
        const prono = new domain_1.Prononstic();
        prono.user = user;
        prono.match = match;
        prono.date = data.date;
        prono.homeScore = data.homeScore;
        prono.awayScore = data.awayScore;
        prono.etat = data.etat;
        return prono;
    }
    static update(pronos, data) {
        var _a;
        pronos.etat = (_a = data.etat) !== null && _a !== void 0 ? _a : pronos.etat;
        return pronos;
    }
    static getPronos(pronos) {
        if (pronos) {
            return {
                id: pronos.id,
                user: pronos.user,
                match: pronos.match,
                date: pronos.date,
                homeScore: pronos.homeScore,
                awayScore: pronos.awayScore,
                etat: pronos.etat,
                createdAt: pronos.createdAt,
                updatedAt: pronos.updatedAt,
                deletedAt: pronos.deletedAt
            };
        }
    }
}
exports.PrononsticFactory = PrononsticFactory;
//# sourceMappingURL=pronos.factory.js.map