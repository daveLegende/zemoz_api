import { OddsDto } from "src/bet/adapter/dto";
import { BetStatus } from "src/couponBet/domain";
export declare class CouponBetAccountDto {
    bet: string;
    coupon: string;
    selectedOptions: OddsDto;
    status?: BetStatus;
}
declare const UpdateCouponBetDTO_base: import("@nestjs/common").Type<Partial<CouponBetAccountDto>>;
export declare class UpdateCouponBetDTO extends UpdateCouponBetDTO_base {
    id: string;
}
export {};
