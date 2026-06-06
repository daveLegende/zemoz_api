import { User } from '../../user/domain';
import { ICreateTournoiCouponDTO, IUpdateTournoiCouponDTO } from '../app/dto';
import { TournoiCoupon } from '../domain';

export abstract class TournoiCouponFactory {
  static async create(
    data: ICreateTournoiCouponDTO,
    user: User,
  ): Promise<TournoiCoupon> {
    const coupon = new TournoiCoupon();

    coupon.user = user;
    // coupon.tournoiCouponBets is managed via repository relations usually,
    // or we assign what we have. data.tournoiCouponBets comes as DTO/Partial from service.
    // For creation, we might not need to set it on the entity if we save children separately.
    coupon.totalOdds = data.totalOdds;
    coupon.amount = data.amount;
    coupon.etat = data.etat;
    coupon.gains = data.gains;
    coupon.isPaid = data.isPaid;

    return coupon;
  }

  static update(
    coupon: TournoiCoupon,
    data: IUpdateTournoiCouponDTO,
  ): TournoiCoupon {
    coupon.etat = data.etat ?? coupon.etat;
    coupon.isDeleted = coupon.isDeleted;

    return coupon;
  }

  static getCoupon(coupon: TournoiCoupon): TournoiCoupon {
    if (coupon) {
      return {
        id: coupon.id,
        user: coupon.user,
        totalOdds: coupon.totalOdds,
        gains: coupon.gains,
        amount: coupon.amount,
        etat: coupon.etat,
        isPaid: coupon.isPaid,
        tournoiCouponBets: coupon.tournoiCouponBets,
        isDeleted: coupon.isDeleted,
        createdAt: coupon.createdAt,
        updatedAt: coupon.updatedAt,
        deletedAt: coupon.deletedAt,
      };
    }
  }
}
