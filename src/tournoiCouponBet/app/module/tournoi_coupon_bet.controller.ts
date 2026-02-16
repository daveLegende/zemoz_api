import { IIDParamDTO } from 'app/dto';
import { ICreateTournoiCouponBetDTO, IUpdateTournoiCouponBetDTO } from '../dto';
import { TournoiCouponBet } from 'src/tournoiCouponBet/domain/tournoi_coupon_bet.model';

export abstract class ITournoiCouponBetController {
  abstract all(): Promise<TournoiCouponBet[]>;

  abstract show(param: IIDParamDTO): Promise<TournoiCouponBet>;

  abstract create(data: ICreateTournoiCouponBetDTO, file?: any): Promise<TournoiCouponBet>;

  abstract search(data: Partial<TournoiCouponBet>, file?: any): Promise<TournoiCouponBet>;

  abstract update(data: IUpdateTournoiCouponBetDTO, file?: any): Promise<TournoiCouponBet>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  // abstract getMatchPendingCouponBet(param: IIDParamDTO): Promise<CouponBet[]>;

  // abstract getPendingCouponBet(): Promise<CouponBet[]>;
}
