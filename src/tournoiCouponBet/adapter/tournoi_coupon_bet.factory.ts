
import { BetStatus, TournoiCouponBet } from "../domain";
import { Bet } from "../../bet/domain";
import { TournoiCoupon } from "../../tournoiCoupon/domain";

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


export abstract class TournoiCouponBetFactory {
  static create(
    bet: Bet,
    tournoiCoupon: TournoiCoupon,
    selectedOptions: Record<string, number>,
  ): TournoiCouponBet {
    const couponBet = new TournoiCouponBet();

    couponBet.bet = bet;
    couponBet.tournoiCoupon = tournoiCoupon;
    couponBet.selectedOptions = selectedOptions;
    couponBet.status = BetStatus.PENDING;

    return couponBet;
  }

  static updateStatus(
    tournoiCouponBet: TournoiCouponBet,
    status: BetStatus,
  ): TournoiCouponBet {
    tournoiCouponBet.status = status;
    return tournoiCouponBet;
  }


  static getCouponBet(tournoiCouponBet: TournoiCouponBet): TournoiCouponBet {
    if (tournoiCouponBet) {
      return {
        id: tournoiCouponBet.id,
        bet: tournoiCouponBet.bet,
        tournoiCoupon: tournoiCouponBet.tournoiCoupon,
        selectedOptions: tournoiCouponBet.selectedOptions,
        status: tournoiCouponBet.status,
        createdAt: tournoiCouponBet.createdAt,
        updatedAt: tournoiCouponBet.updatedAt,
        deletedAt: tournoiCouponBet.deletedAt
      };
    }
  }
}
