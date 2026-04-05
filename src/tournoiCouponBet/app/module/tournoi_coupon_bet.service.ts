import { TournoiCouponBet } from "../../domain/tournoi_coupon_bet.model";
import { ICreateTournoiCouponBetDTO, IUpdateTournoiCouponBetDTO } from "../dto";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class ITournoiCouponBetService {
  abstract add(data: ICreateTournoiCouponBetDTO): Promise<TournoiCouponBet>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<TournoiCouponBet>>;

  abstract fetchOne(id: string): Promise<TournoiCouponBet>;

  abstract edit(data: IUpdateTournoiCouponBetDTO): Promise<TournoiCouponBet>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<TournoiCouponBet>): Promise<TournoiCouponBet>;

  abstract remove(id: string): Promise<boolean>;

  abstract getPendingTournoiCouponBet(): Promise<TournoiCouponBet[]>;
}
