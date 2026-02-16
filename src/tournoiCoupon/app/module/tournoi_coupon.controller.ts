import { IIDParamDTO } from 'app/dto';
import { TournoiCoupon } from 'src/tournoiCoupon/domain';
import { ICreateTournoiCouponDTO, IUpdateTournoiCouponDTO } from '../dto';

export abstract class ITournoiCouponController {
  abstract all(): Promise<TournoiCoupon[]>;

  abstract show(param: IIDParamDTO): Promise<TournoiCoupon>;

  abstract create(data: ICreateTournoiCouponDTO, file?: any): Promise<TournoiCoupon>;

  abstract search(data: Partial<TournoiCoupon>, file?: any): Promise<TournoiCoupon>;

  abstract update(data: IUpdateTournoiCouponDTO, file?: any): Promise<TournoiCoupon>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  abstract checkCoupons(): Promise<any>;
}
