import { OddsClass } from "../../../bet/domain";
import { TournoiCouponState } from "../../domain";
import { TournoiCouponBet } from "../../../tournoiCouponBet/domain";

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
