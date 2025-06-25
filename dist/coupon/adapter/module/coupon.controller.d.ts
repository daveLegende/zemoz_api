import { IDParamDTO } from 'adapter/dto';
import { ICouponController, ICouponService } from 'src/coupon/app/module';
import { Coupon } from 'src/coupon/domain';
import { CouponAccountDto, UpdateCouponDTO } from '../dto';
import { UpdateMatchDTO } from 'src/match/adapter/dto';
export declare class CouponController implements ICouponController {
    private readonly couponService;
    constructor(couponService: ICouponService);
    all(): Promise<Coupon[]>;
    search(param: Coupon): Promise<Coupon>;
    show({ id }: IDParamDTO): Promise<Coupon>;
    create(data: CouponAccountDto): Promise<Coupon>;
    update(data: UpdateCouponDTO): Promise<Coupon>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
    checkCoupons(data: UpdateMatchDTO): Promise<any>;
}
