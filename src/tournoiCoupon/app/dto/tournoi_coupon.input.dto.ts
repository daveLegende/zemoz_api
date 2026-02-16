import { OddsClass } from "src/bet/domain";
import { TournoiCouponState } from "src/tournoiCoupon/domain";
import { TournoiCouponBet } from "src/tournoiCouponBet/domain";

export class BetTournoiCoupon {
  bet: string;
  selectedOptions: OddsClass;
}

export interface ICreateTournoiCouponDTO {

  user: string;

  totalOdds?: number;

  amount: number;

  gains?: number;

  etat: TournoiCouponState;

  tournoiCouponBets: BetTournoiCoupon[];

  isDeleted?: boolean;

  isPaid?: boolean;

}

export interface IUpdateTournoiCouponDTO extends Partial<ICreateTournoiCouponDTO> {
  id: string;
}
