import { User } from "user/domain";
import { ICreateCouponBetDTO, IUpdateCouponBetDTO } from "../app/dto";
import { BetStatus, CouponBet } from "../domain";
import { Bet } from "src/bet/domain";
import { Coupon } from "src/coupon/domain";

// export abstract class CouponBetFactory {
//     static async create(data: ICreateCouponBetDTO, bet: Bet, coupon: Coupon, selectedOptions: Record<string, number>): Promise<CouponBet> {
//         const couponBet = new CouponBet();

//         couponBet.bet = bet;
//         couponBet.coupon = coupon;
//         couponBet.selectedOptions = selectedOptions;

//         return couponBet;
//     }

//     static update(coupon: CouponBet, data: IUpdateCouponBetDTO): CouponBet {

//       coupon.status = data.status ?? coupon.status;
  
//       return coupon;
//     }
    
//     static getCouponBet(coupon: CouponBet): CouponBet {
//       if (coupon) {
//         return {
//           id: coupon.id,
//           bet: coupon.bet,
//           coupon: coupon.coupon,
//           selectedOptions: coupon.selectedOptions,
//           status: coupon.status,
//           createdAt: coupon.createdAt,
//           updatedAt: coupon.updatedAt,
//           deletedAt: coupon.deletedAt
//         };
//       }
//     }
// }


export abstract class CouponBetFactory {
  static create(
    bet: Bet,
    coupon: Coupon,
    selectedOptions: Record<string, number>,
  ): CouponBet {
    const couponBet = new CouponBet();

    couponBet.bet = bet;
    couponBet.coupon = coupon;
    couponBet.selectedOptions = selectedOptions;
    couponBet.status = BetStatus.PENDING;

    return couponBet;
  }

  static updateStatus(
    couponBet: CouponBet,
    status: BetStatus,
  ): CouponBet {
    couponBet.status = status;
    return couponBet;
  }


  static getCouponBet(coupon: CouponBet): CouponBet {
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
