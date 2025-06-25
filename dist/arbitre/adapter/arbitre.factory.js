"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArbitreFactory = void 0;
const domain_1 = require("../domain");
class ArbitreFactory {
    static async create(data) {
        const arbitre = new domain_1.Arbitre();
        arbitre.name = data.name;
        arbitre.phone = data.phone;
        arbitre.avatar = data.avatar;
        return arbitre;
    }
    static update(arbitre, data) {
        var _a, _b, _c, _d;
        arbitre.name = (_a = data.name) !== null && _a !== void 0 ? _a : arbitre.name;
        arbitre.phone = (_b = data.phone) !== null && _b !== void 0 ? _b : arbitre.phone;
        arbitre.role = (_c = data.role) !== null && _c !== void 0 ? _c : arbitre.role;
        arbitre.avatar = (_d = data.avatar) !== null && _d !== void 0 ? _d : arbitre.avatar;
        return arbitre;
    }
    static getFileLink(file) {
        if (file) {
            return `${process.env.APP_BASE_URL}/files/${file}`;
        }
    }
    static getArbitre(arbitre) {
        if (arbitre) {
            return {
                id: arbitre.id,
                name: arbitre.name,
                avatar: this.getFileLink(arbitre.avatar),
                phone: arbitre.phone,
                role: arbitre.role,
                matchs: arbitre.matchs,
                createdAt: arbitre.createdAt,
                updatedAt: arbitre.updatedAt,
                deletedAt: arbitre.deletedAt
            };
        }
    }
}
exports.ArbitreFactory = ArbitreFactory;
//# sourceMappingURL=arbitre.factory.js.map