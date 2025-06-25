import { ATimestamp } from "framework/timestamp.abstract";
import { BetEntity } from "src/bet/framework/schema/bet.entity";
import { CouponEntity } from "src/coupon/framework/schema/coupon.entity";
import { BetStatus, CouponBet } from "src/couponBet/domain";
export declare class CouponBetEntity extends ATimestamp implements CouponBet {
    id: string;
    coupon: CouponEntity;
    bet: BetEntity;
    selectedOptions: Record<string, number>;
    status: BetStatus;
}
