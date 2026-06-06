import { IGenericRepository } from '../../igeneric.interface';
import { TournoiCouponBet } from './tournoi_coupon_bet.model';

export abstract class ITournoiCouponBetRepository {
  abstract tournoiCouponBets: IGenericRepository<TournoiCouponBet>;
}
