"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PouleFactory = void 0;
const domain_1 = require("../domain");
class PouleFactory {
    static async create(data, teams) {
        const poule = new domain_1.Poule();
        poule.name = data.name;
        poule.equipes = teams;
        return poule;
    }
    static update(poule, data) {
        var _a;
        poule.name = (_a = data.name) !== null && _a !== void 0 ? _a : domain_1.Poule.name;
        poule.equipes = poule.equipes;
        return poule;
    }
    static getPoule(poule) {
        if (poule) {
            return {
                id: poule.id,
                name: poule.name,
                equipes: poule.equipes,
                createdAt: poule.createdAt,
                updatedAt: poule.updatedAt,
                deletedAt: poule.deletedAt
            };
        }
    }
}
exports.PouleFactory = PouleFactory;
//# sourceMappingURL=poule.factory.js.map