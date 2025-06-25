import { IGenericRepository } from "src/igeneric.interface";
import { Coupon } from "./coupon.model";
export declare abstract class ICouponRepository {
    abstract coupons: IGenericRepository<Coupon>;
}
