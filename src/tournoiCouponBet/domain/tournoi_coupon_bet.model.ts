import { ITimestamp } from "domain/interface";
import { Bet } from "src/bet/domain";
import { TournoiCoupon } from "src/tournoiCoupon/domain";
import { BetStatus } from "./tournoi_coupon.bet.enum";

export class TournoiCouponBet extends ITimestamp {
    id: string;
    tournoiCoupon: TournoiCoupon;
    bet: Bet;
    selectedOptions: Record<string, number>;
    status: BetStatus;
}
