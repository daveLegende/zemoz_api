import { Account } from "../../account/domain/account.model";
import { ICreateCouponDTO, IUpdateCouponDTO } from "../app/dto";
import { Coupon } from "../domain";

export abstract class CouponFactory {
    static async create(data: ICreateCouponDTO, account: Account): Promise<Coupon> {
        const coupon = new Coupon();

        coupon.account = account;
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
          account: coupon.account,
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