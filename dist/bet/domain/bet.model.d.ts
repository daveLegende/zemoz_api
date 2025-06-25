import { ITimestamp } from "domain/interface";
import { Match } from "src/match/domain";
import { CategoryName } from "./bet.enum";
import { CouponBet } from "src/couponBet/domain";
export declare class BetCategories extends ITimestamp {
    id: string;
    name: CategoryName;
    options: string[];
}
export declare class OddsClass {
    V1?: number;
    V2?: number;
    X?: number;
    OUI?: number;
    NON?: number;
}
export declare class Bet extends ITimestamp {
    id: string;
    category: CategoryName;
    odds: Record<string, number>;
    match: Match;
    couponBets: CouponBet[];
}
