import { Coupon } from "../../../coupon/domain";
import { ICreateCouponDTO, IUpdateCouponDTO } from "../dto";
import { IUpdateMatchDTO } from "../../../match/app/dto";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class ICouponService {
  abstract add(data: ICreateCouponDTO): Promise<Coupon>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Coupon>>;

  abstract fetchOne(id: string): Promise<Coupon>;

  abstract edit(data: IUpdateCouponDTO): Promise<Coupon>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Coupon>): Promise<Coupon>;

  abstract remove(id: string): Promise<boolean>;

  abstract checkCoupons(data: IUpdateMatchDTO): Promise<any>;

  abstract validatePendingCoupons(): Promise<any>;

  // abstract getMatchPendingCoupons(id: string): Promise<Coupon[]>;

  abstract getPendingCoupons(): Promise<Coupon[]>;

}
