import { OddsClass } from '../../../bet/domain';
import { CouponState } from '../../../coupon/domain';
import { CouponBet } from '../../../couponBet/domain';

export class BetCoupon {
  bet: string;
  selectedOptions: OddsClass;
}

export interface ICreateCouponDTO {
  user: string;

  totalOdds?: number;

  amount: number;

  gains?: number;

  etat: CouponState;

  couponBets: CouponBet[];

  isDeleted?: boolean;

  isPaid?: boolean;
}

export interface IUpdateCouponDTO extends Partial<ICreateCouponDTO> {
  id: string;
}
