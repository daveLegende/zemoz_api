import { OddsClass } from "src/bet/domain";
import { CouponState } from "src/coupon/domain";
import { CouponBet } from "src/couponBet/domain";
export declare class BetCoupon {
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
}
export interface IUpdateCouponDTO extends Partial<ICreateCouponDTO> {
    id: string;
}
