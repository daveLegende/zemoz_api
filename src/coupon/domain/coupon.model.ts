import { ITimestamp } from "../../_shared/domain/interface";
import { User } from "../../user/domain";
import { CouponState } from "./coupon.enum";
import { CouponBet } from "../../couponBet/domain";

export class Coupon extends ITimestamp {
    id: string;
    user: User;
    totalOdds: number;
    amount: number;
    gains: number;
    etat: CouponState;
    couponBets: CouponBet[];
    isDeleted: boolean;
    isPaid: boolean;
}
