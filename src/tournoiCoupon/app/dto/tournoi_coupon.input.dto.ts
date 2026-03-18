import { IsObject, IsString } from "class-validator";
import { OddsClass } from "../../../bet/domain";
import { TournoiCouponState } from "../../domain";
import { TournoiCouponBet } from "../../../tournoiCouponBet/domain";

export class BetTournoiCoupon {
  @IsString()
  bet: string;

  @IsObject()
  selectedOptions: Record<string, number>;
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
