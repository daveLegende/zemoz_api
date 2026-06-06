import { ITimestamp } from '../../_shared/domain/interface';
import { User } from '../../user/domain';
import { TournoiCouponState } from './tournoi_coupon.enum';
import { TournoiCouponBet } from '../../tournoiCouponBet/domain';

export class TournoiCoupon extends ITimestamp {
  id: string;
  user: User;
  totalOdds: number;
  amount: number;
  gains: number;
  etat: TournoiCouponState;
  tournoiCouponBets: TournoiCouponBet[];
  isDeleted: boolean;
  isPaid: boolean;
}
