import { ATimestamp } from "framework/timestamp.abstract";
import { Coupon, CouponState } from "src/coupon/domain";
import { CouponBetEntity } from "src/couponBet/framework/schema/coupon_bet.entity";
import { UserEntity } from "user/framework/database/schema/user.entity";
export declare class CouponEntity extends ATimestamp implements Coupon {
    id: string;
    user: UserEntity;
    couponBets: CouponBetEntity[];
    totalOdds: number;
    gains: number;
    amount: number;
    etat: CouponState;
    isDeleted: boolean;
}
