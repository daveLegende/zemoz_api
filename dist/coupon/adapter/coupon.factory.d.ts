import { User } from "user/domain";
import { ICreateCouponDTO, IUpdateCouponDTO } from "../app/dto";
import { Coupon } from "../domain";
export declare abstract class CouponFactory {
    static create(data: ICreateCouponDTO, user: User): Promise<Coupon>;
    static update(coupon: Coupon, data: IUpdateCouponDTO): Coupon;
    static getCoupon(coupon: Coupon): Coupon;
}
