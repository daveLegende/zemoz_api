import { IIDParamDTO } from 'app/dto';
import { TournoiCoupon } from '../../domain';
import { ICreateTournoiCouponDTO, IUpdateTournoiCouponDTO } from '../dto';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class ITournoiCouponController {
  abstract all(options: PaginationOptionsDto): Promise<PaginationResultDto<TournoiCoupon>>;

  abstract show(param: IIDParamDTO): Promise<TournoiCoupon>;

  abstract create(data: ICreateTournoiCouponDTO, file?: any): Promise<TournoiCoupon>;

  abstract search(data: Partial<TournoiCoupon>, file?: any): Promise<TournoiCoupon>;

  abstract update(data: IUpdateTournoiCouponDTO, file?: any): Promise<TournoiCoupon>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  abstract checkCoupons(): Promise<any>;
}
