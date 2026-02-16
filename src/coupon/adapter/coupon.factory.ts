import { User } from "user/domain";
import { BetCoupon, ICreateCouponDTO, IUpdateCouponDTO } from "../app/dto";
import { Coupon } from "../domain";
import { Bet } from "src/bet/domain";
import { CouponBet } from "src/couponBet/domain";

export abstract class CouponFactory {
    static async create(data: ICreateCouponDTO, user: User): Promise<Coupon> {
        const coupon = new Coupon();

        coupon.user = user;
        coupon.couponBets = coupon.couponBets;
        coupon.totalOdds = data.totalOdds;
        coupon.amount = data.amount;
        coupon.etat = data.etat;
        coupon.gains = data.gains;

        return coupon;
    }

    static update(coupon: Coupon, data: IUpdateCouponDTO): Coupon {

      coupon.etat = data.etat ?? coupon.etat;
      coupon.isDeleted = coupon.isDeleted;
      coupon.isPaid = coupon.isPaid;
  
      return coupon;
    }
    
    static getCoupon(coupon: Coupon): Coupon {
      if (coupon) {
        return {
          id: coupon.id,
          user: coupon.user,
          totalOdds: coupon.totalOdds,
          gains: coupon.gains,
          amount: coupon.amount,
          etat: coupon.etat,
          isPaid: coupon.isPaid,
          couponBets: coupon.couponBets,
          isDeleted: coupon.isDeleted,
          createdAt: coupon.createdAt,
          updatedAt: coupon.updatedAt,
          deletedAt: coupon.deletedAt
        };
      }
    }
}