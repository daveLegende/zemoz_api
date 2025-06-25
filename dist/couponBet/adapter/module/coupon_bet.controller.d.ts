import { IDParamDTO } from 'adapter/dto';
import { CouponBetAccountDto, UpdateCouponBetDTO } from '../dto';
import { CouponBet } from 'src/couponBet/domain';
import { ICouponBetController, ICouponBetService } from 'src/couponBet/app/module';
export declare class CouponBetController implements ICouponBetController {
    private readonly couponBetService;
    constructor(couponBetService: ICouponBetService);
    all(): Promise<CouponBet[]>;
    search(param: CouponBet): Promise<CouponBet>;
    show({ id }: IDParamDTO): Promise<CouponBet>;
    create(data: CouponBetAccountDto): Promise<CouponBet>;
    update(data: UpdateCouponBetDTO): Promise<CouponBet>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
