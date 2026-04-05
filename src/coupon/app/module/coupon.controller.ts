import { IIDParamDTO } from '../../../_shared/app/dto';
import { Coupon } from '../../../coupon/domain';
import { ICreateCouponDTO, IUpdateCouponDTO } from '../dto';
import { IUpdateMatchDTO } from '../../../match/app/dto';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class ICouponController {
  abstract all(options: PaginationOptionsDto): Promise<PaginationResultDto<Coupon>>;

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
