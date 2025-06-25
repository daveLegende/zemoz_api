import { OddsClass } from "src/bet/domain";
import { BetStatus } from "src/couponBet/domain";
export interface ICreateCouponBetDTO {
    bet: string;
    coupon: string;
    selectedOptions: OddsClass;
    status?: BetStatus;
}
export interface IUpdateCouponBetDTO extends Partial<ICreateCouponBetDTO> {
    id: string;
}
