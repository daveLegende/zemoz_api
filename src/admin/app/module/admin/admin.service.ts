import { Admin } from '../../../../admin/domain';
import {
  IChangeAdminPasswordDTO,
  ICreateAdminDTO,
  IUpdateAdminDTO,
} from '../../dto';
import { Coupon } from '../../../../coupon/domain';
import { TournoiCoupon } from '../../../../tournoiCoupon/domain';

export abstract class IAdminService {
  abstract add(data: ICreateAdminDTO): Promise<Admin>;

  abstract fetchAll(): Promise<Admin[]>;

  abstract fetchOne(id: string): Promise<Admin>;

  abstract edit(data: IUpdateAdminDTO): Promise<Admin>;

  abstract changePassword(data: IChangeAdminPasswordDTO): Promise<boolean>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Admin>): Promise<Admin>;

  abstract remove(id: string): Promise<boolean>;

  abstract getAllCoupons(): Promise<Coupon[]>;

  abstract getAllTournoiCoupons(): Promise<TournoiCoupon[]>;

  abstract getCompleteFinancialReport(): Promise<any>;
}
