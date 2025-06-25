"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponFactory = void 0;
const domain_1 = require("../domain");
class CouponFactory {
    static async create(data, user) {
        const coupon = new domain_1.Coupon();
        coupon.user = user;
        coupon.couponBets = coupon.couponBets;
        coupon.totalOdds = data.totalOdds;
        coupon.amount = data.amount;
        coupon.etat = data.etat;
        coupon.gains = data.gains;
        return coupon;
    }
    static update(coupon, data) {
        var _a;
        coupon.etat = (_a = data.etat) !== null && _a !== void 0 ? _a : coupon.etat;
        coupon.isDeleted = coupon.isDeleted;
        return coupon;
    }
    static getCoupon(coupon) {
        if (coupon) {
            return {
                id: coupon.id,
                user: coupon.user,
                totalOdds: coupon.totalOdds,
                gains: coupon.gains,
                amount: coupon.amount,
                etat: coupon.etat,
                couponBets: coupon.couponBets,
                isDeleted: coupon.isDeleted,
                createdAt: coupon.createdAt,
                updatedAt: coupon.updatedAt,
                deletedAt: coupon.deletedAt
            };
        }
    }
}
exports.CouponFactory = CouponFactory;
//# sourceMappingURL=coupon.factory.js.map