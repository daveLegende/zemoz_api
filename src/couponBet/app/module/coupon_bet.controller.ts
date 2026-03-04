import { IIDParamDTO } from '../../../_shared/app/dto';
import { ICreateCouponBetDTO, IUpdateCouponBetDTO } from '../dto';
import { CouponBet } from '../../../couponBet/domain';

export abstract class ICouponBetController {
  abstract all(): Promise<CouponBet[]>;

  abstract show(param: IIDParamDTO): Promise<CouponBet>;

  abstract create(data: ICreateCouponBetDTO, file?: any): Promise<CouponBet>;

  abstract search(data: Partial<CouponBet>, file?: any): Promise<CouponBet>;

  abstract update(data: IUpdateCouponBetDTO, file?: any): Promise<CouponBet>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  // abstract getMatchPendingCouponBet(param: IIDParamDTO): Promise<CouponBet[]>;

  // abstract getPendingCouponBet(): Promise<CouponBet[]>;
}
