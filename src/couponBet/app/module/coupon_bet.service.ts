import { ICreateCouponBetDTO, IUpdateCouponBetDTO } from "../dto";
import { CouponBet } from "../../../couponBet/domain";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class ICouponBetService {
  abstract add(data: ICreateCouponBetDTO): Promise<CouponBet>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<CouponBet>>;

  abstract fetchOne(id: string): Promise<CouponBet>;

  abstract edit(data: IUpdateCouponBetDTO): Promise<CouponBet>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<CouponBet>): Promise<CouponBet>;

  abstract remove(id: string): Promise<boolean>;

  abstract getMatchPendingCouponBet(id: string): Promise<CouponBet[]>;

  abstract getPendingCouponBet(): Promise<CouponBet[]>;
}
