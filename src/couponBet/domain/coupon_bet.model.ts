import { ITimestamp } from "domain/interface";
import { Bet } from "src/bet/domain";
import { Coupon } from "src/coupon/domain";
import { BetStatus } from "./coupon.bet.enum";

export class CouponBet extends ITimestamp {
    id: string;
    coupon: Coupon;
    bet: Bet;
    selectedOptions: Record<string, number>;
    status: BetStatus;
}
