import { IIDParamDTO } from 'app/dto';
import { Coupon } from 'src/coupon/domain';
import { ICreateCouponDTO, IUpdateCouponDTO } from '../dto';
import { Match } from 'src/match/domain';
import { IUpdateMatchDTO } from 'src/match/app/dto';

export abstract class ICouponController {
  abstract all(): Promise<Coupon[]>;

  abstract show(param: IIDParamDTO): Promise<Coupon>;

  abstract create(data: ICreateCouponDTO, file?: any): Promise<Coupon>;

  abstract search(data: Partial<Coupon>, file?: any): Promise<Coupon>;

  abstract update(data: IUpdateCouponDTO, file?: any): Promise<Coupon>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  abstract checkCoupons(data: IUpdateMatchDTO): Promise<any>;

  // abstract getMatchPendingCoupons(param: IIDParamDTO): Promise<Coupon[]>;

  abstract getPendingCoupons(): Promise<Coupon[]>;
}
