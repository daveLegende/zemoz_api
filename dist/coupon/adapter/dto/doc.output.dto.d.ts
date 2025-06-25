import { CouponState } from "src/coupon/domain";
export declare class DocCouponOutputDto {
    id: string;
    user: string;
    Coupons: string[];
    totalOdds: number;
    amount: number;
    gains: number;
    etat: CouponState;
}
