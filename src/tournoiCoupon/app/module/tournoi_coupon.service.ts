import { Coupon } from "src/coupon/domain";
import { ICreateTournoiCouponDTO, IUpdateTournoiCouponDTO } from "../dto";
import { IUpdateMatchDTO } from "src/match/app/dto";
import { TournoiCoupon } from "src/tournoiCoupon/domain";

export abstract class ITournoiCouponService {
  abstract add(data: ICreateTournoiCouponDTO): Promise<TournoiCoupon>;

  abstract fetchAll(): Promise<TournoiCoupon[]>;

  abstract fetchOne(id: string): Promise<TournoiCoupon>;

  abstract edit(data: IUpdateTournoiCouponDTO): Promise<TournoiCoupon>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<TournoiCoupon>): Promise<TournoiCoupon>;

  abstract remove(id: string): Promise<boolean>;

  abstract checkCoupons(): Promise<any>;

}
