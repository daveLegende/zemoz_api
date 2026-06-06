import { ITimestamp } from '../../_shared/domain/interface';
import { Bet } from '../../bet/domain';
import { TournoiCoupon } from '../../tournoiCoupon/domain';
import { BetStatus } from './tournoi_coupon.bet.enum';

export class TournoiCouponBet extends ITimestamp {
  id: string;
  tournoiCoupon: TournoiCoupon;
  bet: Bet;
  selectedOptions: Record<string, number>;
  status: BetStatus;
}
