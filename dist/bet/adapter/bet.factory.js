"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BetFactory = void 0;
const domain_1 = require("../domain");
class BetFactory {
    static async create(data, match, odds) {
        const bet = new domain_1.Bet();
        bet.category = data.category;
        bet.odds = odds;
        bet.match = match;
        return bet;
    }
    static update(bet, data) {
        var _a;
        bet.category = (_a = data.category) !== null && _a !== void 0 ? _a : bet.category;
        bet.match = bet.match;
        return bet;
    }
    static getBet(bet) {
        if (bet) {
            return {
                id: bet.id,
                category: bet.category,
                odds: bet.odds,
                match: bet.match,
                couponBets: bet.couponBets,
                createdAt: bet.createdAt,
                updatedAt: bet.updatedAt,
                deletedAt: bet.deletedAt
            };
        }
    }
}
exports.BetFactory = BetFactory;
//# sourceMappingURL=bet.factory.js.map