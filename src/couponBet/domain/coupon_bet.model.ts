import { ITimestamp } from "../../_shared/domain/interface";
import { Bet } from "../../bet/domain";
import { Coupon } from "../../coupon/domain";
import { BetStatus } from "./coupon.bet.enum";

export class CouponBet extends ITimestamp {
    id: string;
    coupon: Coupon;
    bet: Bet;
    selectedOptions: Record<string, number>;
    status: BetStatus;
}
