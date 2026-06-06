import { IGenericRepository } from '../../igeneric.interface';
import { TournoiCoupon } from './tournoi_coupon.model';

export abstract class ITournoiCouponRepository {
  abstract tournoiCoupons: IGenericRepository<TournoiCoupon>;
}
