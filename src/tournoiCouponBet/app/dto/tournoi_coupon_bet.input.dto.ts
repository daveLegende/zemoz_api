import { OddsClass } from "src/bet/domain";
import { BetStatus } from "src/couponBet/domain";

export interface ICreateTournoiCouponBetDTO {

  bet: string;

  tournoiCoupon: string;
  
  selectedOptions: OddsClass;

  status?: BetStatus;

}

export interface IUpdateTournoiCouponBetDTO extends Partial<ICreateTournoiCouponBetDTO> {
  id: string;
}
