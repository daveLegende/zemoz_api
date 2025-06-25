import { ICreateCouponBetDTO, IUpdateCouponBetDTO } from "../app/dto";
import { CouponBet } from "../domain";
import { Bet } from "src/bet/domain";
import { Coupon } from "src/coupon/domain";
export declare abstract class CouponBetFactory {
    static create(data: ICreateCouponBetDTO, bet: Bet, coupon: Coupon, selectedOptions: Record<string, number>): Promise<CouponBet>;
    static update(coupon: CouponBet, data: IUpdateCouponBetDTO): CouponBet;
    static getCouponBet(coupon: CouponBet): CouponBet;
}
