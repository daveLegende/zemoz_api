import { IGenericRepository } from '../../igeneric.interface';
import { Coupon } from './coupon.model';

export abstract class ICouponRepository {
  abstract coupons: IGenericRepository<Coupon>;
}
