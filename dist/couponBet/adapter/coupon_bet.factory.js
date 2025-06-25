"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponBetFactory = void 0;
const domain_1 = require("../domain");
class CouponBetFactory {
    static async create(data, bet, coupon, selectedOptions) {
        const couponBet = new domain_1.CouponBet();
        couponBet.bet = bet;
        couponBet.coupon = coupon;
        couponBet.selectedOptions = selectedOptions;
        return couponBet;
    }
    static update(coupon, data) {
        var _a;
        coupon.status = (_a = data.status) !== null && _a !== void 0 ? _a : coupon.status;
        return coupon;
    }
    static getCouponBet(coupon) {
        if (coupon) {
            return {
                id: coupon.id,
                bet: coupon.bet,
                coupon: coupon.coupon,
                selectedOptions: coupon.selectedOptions,
                status: coupon.status,
                createdAt: coupon.createdAt,
                updatedAt: coupon.updatedAt,
                deletedAt: coupon.deletedAt
            };
        }
    }
}
exports.CouponBetFactory = CouponBetFactory;
//# sourceMappingURL=coupon_bet.factory.js.map