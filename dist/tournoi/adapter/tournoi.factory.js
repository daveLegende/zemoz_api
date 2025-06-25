"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournoiFactory = void 0;
const domain_1 = require("../domain");
class TournoiFactory {
    static async create(data) {
        const tournoi = new domain_1.Tournoi();
        tournoi.name = data.name;
        tournoi.editionName = data.editionName;
        tournoi.edition = data.edition;
        tournoi.annee = data.annee;
        return tournoi;
    }
    static update(tournoi, data) {
        var _a, _b, _c, _d;
        tournoi.name = (_a = data.name) !== null && _a !== void 0 ? _a : tournoi.name;
        tournoi.editionName = (_b = data.editionName) !== null && _b !== void 0 ? _b : tournoi.editionName;
        tournoi.edition = (_c = data.edition) !== null && _c !== void 0 ? _c : tournoi.edition;
        tournoi.annee = (_d = data.annee) !== null && _d !== void 0 ? _d : tournoi.annee;
        return tournoi;
    }
    static getTournoi(tournoi) {
        if (tournoi) {
            return {
                id: tournoi.id,
                name: tournoi.name,
                editionName: tournoi.editionName,
                edition: tournoi.edition,
                createdAt: tournoi.createdAt,
                updatedAt: tournoi.updatedAt,
                deletedAt: tournoi.deletedAt
            };
        }
    }
}
exports.TournoiFactory = TournoiFactory;
//# sourceMappingURL=tournoi.factory.js.map