import { IIDParamDTO } from 'app/dto';
import { ICreateCouponBetDTO, IUpdateCouponBetDTO } from '../dto';
import { CouponBet } from 'src/couponBet/domain';
export declare abstract class ICouponBetController {
    abstract all(): Promise<CouponBet[]>;
    abstract show(param: IIDParamDTO): Promise<CouponBet>;
    abstract create(data: ICreateCouponBetDTO, file?: any): Promise<CouponBet>;
    abstract search(data: Partial<CouponBet>, file?: any): Promise<CouponBet>;
    abstract update(data: IUpdateCouponBetDTO, file?: any): Promise<CouponBet>;
    abstract setState(param: IIDParamDTO): Promise<boolean>;
    abstract remove(param: IIDParamDTO): Promise<boolean>;
}
