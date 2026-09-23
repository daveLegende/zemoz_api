import { Coupon } from "../../../coupon/domain";
import { ICreateTournoiCouponDTO, IUpdateTournoiCouponDTO } from "../dto";
import { IUpdateMatchDTO } from "../../../match/app/dto";
import { TournoiCoupon } from "../../domain";

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class ITournoiCouponService {
  abstract add(data: ICreateTournoiCouponDTO): Promise<TournoiCoupon>;

  abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<TournoiCoupon>>;

  abstract fetchOne(id: string): Promise<TournoiCoupon>;

  abstract edit(data: IUpdateTournoiCouponDTO): Promise<TournoiCoupon>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<TournoiCoupon>): Promise<TournoiCoupon>;

  abstract remove(id: string): Promise<boolean>;

  abstract checkCoupons(): Promise<any>;

}
