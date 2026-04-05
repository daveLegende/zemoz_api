import { Coupon } from "../../../coupon/domain";
import { ICreateTournoiCouponDTO, IUpdateTournoiCouponDTO } from "../dto";
import { IUpdateMatchDTO } from "../../../match/app/dto";
import { TournoiCoupon } from "../../domain";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class ITournoiCouponService {
  abstract add(data: ICreateTournoiCouponDTO): Promise<TournoiCoupon>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<TournoiCoupon>>;

  abstract fetchOne(id: string): Promise<TournoiCoupon>;

  abstract edit(data: IUpdateTournoiCouponDTO): Promise<TournoiCoupon>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<TournoiCoupon>): Promise<TournoiCoupon>;

  abstract remove(id: string): Promise<boolean>;

  abstract checkCoupons(): Promise<any>;

}
