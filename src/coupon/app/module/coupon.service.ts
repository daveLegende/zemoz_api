import { Coupon } from "src/coupon/domain";
import { ICreateCouponDTO, IUpdateCouponDTO } from "../dto";
import { Match } from "src/match/domain";
import { IUpdateMatchDTO } from "src/match/app/dto";

export abstract class ICouponService {
  abstract add(data: ICreateCouponDTO): Promise<Coupon>;

  abstract fetchAll(): Promise<Coupon[]>;

  abstract fetchOne(id: string): Promise<Coupon>;

  abstract edit(data: IUpdateCouponDTO): Promise<Coupon>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Coupon>): Promise<Coupon>;

  abstract remove(id: string): Promise<boolean>;

  abstract checkCoupons(data: IUpdateMatchDTO): Promise<any>;

  abstract validatePendingCoupons(): Promise<any>;

}
