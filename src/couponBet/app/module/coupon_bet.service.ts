import { ICreateCouponBetDTO, IUpdateCouponBetDTO } from '../dto';
import { CouponBet } from '../../../couponBet/domain';

export abstract class ICouponBetService {
  abstract add(data: ICreateCouponBetDTO): Promise<CouponBet>;

  abstract fetchAll(): Promise<CouponBet[]>;

  abstract fetchOne(id: string): Promise<CouponBet>;

  abstract edit(data: IUpdateCouponBetDTO): Promise<CouponBet>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<CouponBet>): Promise<CouponBet>;

  abstract remove(id: string): Promise<boolean>;

  abstract getMatchPendingCouponBet(id: string): Promise<CouponBet[]>;

  abstract getPendingCouponBet(): Promise<CouponBet[]>;
}
