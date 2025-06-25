import { ATimestamp } from "framework/timestamp.abstract";
import { Bet, CategoryName } from "src/bet/domain";
import { CouponBetEntity } from "src/couponBet/framework/schema/coupon_bet.entity";
import { MatchEntity } from "src/match/framework/database/schema/match.entity";
export declare class BetEntity extends ATimestamp implements Bet {
    id: string;
    category: CategoryName;
    odds: Record<string, number>;
    match: MatchEntity;
    couponBets: CouponBetEntity[];
}
