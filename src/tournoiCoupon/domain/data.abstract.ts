import { IGenericRepository } from "src/igeneric.interface";
import { TournoiCoupon } from "./tournoi_coupon.model";

export abstract class ITournoiCouponRepository {
    abstract tournoiCoupons: IGenericRepository<TournoiCoupon>;
}