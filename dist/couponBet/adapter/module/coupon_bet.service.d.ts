import { CouponBetAccountDto, UpdateCouponBetDTO } from '../dto';
import { IBetRepository } from 'src/bet/domain/data.abstract';
import { CouponBet } from 'src/couponBet/domain';
import { ICouponBetRepository } from 'src/couponBet/domain/data.abstract';
import { ICouponRepository } from 'src/coupon/domain/data.abstract';
import { ICouponBetService } from 'src/couponBet/app/module';
export declare class CouponBetService implements ICouponBetService {
    private couponBetsRepository;
    private couponRepository;
    private betRepository;
    private readonly logger;
    constructor(couponBetsRepository: ICouponBetRepository, couponRepository: ICouponRepository, betRepository: IBetRepository);
    fetchAll(): Promise<CouponBet[]>;
    fetchOne(id: string): Promise<CouponBet>;
    search(data: Partial<CouponBet>): Promise<CouponBet>;
    add(data: CouponBetAccountDto): Promise<CouponBet>;
    edit(data: UpdateCouponBetDTO): Promise<CouponBet>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
