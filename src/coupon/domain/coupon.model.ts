import { ITimestamp } from "domain/interface";
import { User } from "user/domain";
import { CouponState } from "./coupon.enum";
import { CouponBet } from "src/couponBet/domain";

export class Coupon extends ITimestamp {
    id: string;
    user: User;
    totalOdds: number;
    amount: number;
    gains: number;
    etat: CouponState;
    couponBets: CouponBet[];
    isDeleted: boolean;
}
