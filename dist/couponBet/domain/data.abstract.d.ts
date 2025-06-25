import { IGenericRepository } from "src/igeneric.interface";
import { CouponBet } from "./coupon_bet.model";
export declare abstract class ICouponBetRepository {
    abstract couponBets: IGenericRepository<CouponBet>;
}
