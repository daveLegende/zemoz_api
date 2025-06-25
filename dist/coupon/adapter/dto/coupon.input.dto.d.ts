import { BetCoupon } from "src/coupon/app/dto";
import { CouponState } from "src/coupon/domain";
import { CouponBet } from "src/couponBet/domain";
export declare class BetCouponDTO {
    bet: string;
    couponBets: BetCoupon[];
}
export declare class CouponAccountDto {
    user: string;
    couponBets: CouponBet[];
    totalOdds?: number;
    amount: number;
    gains?: number;
    etat: CouponState;
    isDeleted?: boolean;
}
declare const UpdateCouponDTO_base: import("@nestjs/common").Type<Partial<CouponAccountDto>>;
export declare class UpdateCouponDTO extends UpdateCouponDTO_base {
    id: string;
}
export {};
