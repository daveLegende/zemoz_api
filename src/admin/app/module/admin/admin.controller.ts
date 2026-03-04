import { IIDParamDTO } from '../../../../_shared/app/dto';
import { Admin } from '../../../../admin/domain';
import { ICreateAdminDTO, IUpdateAdminDTO } from '../../dto';
import { Coupon } from '../../../../coupon/domain';
import { TournoiCoupon } from '../../../../tournoiCoupon/domain';

export abstract class IAdminController {
  abstract all(): Promise<Admin[]>;

  abstract show(param: IIDParamDTO): Promise<Admin>;

  abstract create(data: ICreateAdminDTO, file?: any): Promise<Admin>;

  abstract search(data: Partial<Admin>, file?: any): Promise<Admin>;

  abstract update(data: IUpdateAdminDTO, file?: any): Promise<Admin>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  abstract getAllCoupons(): Promise<Coupon[]>;

  abstract getAllTournoiCoupons(): Promise<TournoiCoupon[]>;

  abstract getCompleteFinancialReport(): Promise<any>;
}
