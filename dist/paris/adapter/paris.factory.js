"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParisFactory = void 0;
const domain_1 = require("../domain");
class ParisFactory {
    static async create(data, match, user) {
        const paris = new domain_1.Paris();
        paris.match = match;
        paris.user = user;
        paris.amount = data.amount;
        paris.potentialGain = data.potentialGain;
        paris.type = data.type;
        paris.isPaid = data.isPaid;
        paris.isWon = data.isWon;
        paris.odd = data.odd;
        paris.state = data.state;
        return paris;
    }
    static update(paris, data, match, user) {
        var _a, _b, _c, _d, _e, _f;
        paris.type = (_a = data.type) !== null && _a !== void 0 ? _a : paris.type;
        paris.odd = (_b = data.odd) !== null && _b !== void 0 ? _b : paris.odd;
        paris.isPaid = (_c = data.isPaid) !== null && _c !== void 0 ? _c : paris.isPaid;
        paris.isWon = (_d = data.isWon) !== null && _d !== void 0 ? _d : paris.isWon;
        paris.amount = data.amount;
        paris.potentialGain = (_e = data.potentialGain) !== null && _e !== void 0 ? _e : paris.potentialGain;
        paris.match = match !== null && match !== void 0 ? match : paris.match;
        paris.user = user !== null && user !== void 0 ? user : paris.user;
        paris.state = (_f = data.state) !== null && _f !== void 0 ? _f : paris.state;
        return paris;
    }
    static getParis(paris) {
        if (paris) {
            return {
                id: paris.id,
                odd: paris.odd,
                match: paris.match,
                user: paris.user,
                isPaid: paris.isPaid,
                isWon: paris.isWon,
                potentialGain: paris.potentialGain,
                amount: paris.amount,
                type: paris.type,
                state: paris.state,
                createdAt: paris.createdAt,
                updatedAt: paris.updatedAt,
                deletedAt: paris.deletedAt
            };
        }
    }
}
exports.ParisFactory = ParisFactory;
//# sourceMappingURL=paris.factory.js.map