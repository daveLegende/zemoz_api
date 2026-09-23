import { Bet } from "../../../bet/domain";
import { ICreateBetDTO, IUpdateBetDTO } from "../dto";


import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IBetService {
  abstract add(data: ICreateBetDTO): Promise<Bet>;

  // abstract addMultiple(data: ICreateMultipleBetsDto): Promise<Bet[]>;

  abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<Bet>>;

  abstract fetchOne(id: string): Promise<Bet>;

  abstract edit(data: IUpdateBetDTO): Promise<Bet>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Bet>): Promise<Bet>;

  abstract remove(id: string): Promise<boolean>;
}
