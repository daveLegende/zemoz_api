import { IIDParamDTO } from '../../../_shared/app/dto';
import { Bet } from '../../../bet/domain';
import { ICreateBetDTO, IUpdateBetDTO } from '../dto';

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IBetController {
  abstract all(query?: PaginationQuery): Promise<PaginatedResult<Bet>>;

  abstract show(param: IIDParamDTO): Promise<Bet>;

  abstract create(data: ICreateBetDTO, file?: any): Promise<Bet>;

  abstract search(data: Partial<Bet>, file?: any): Promise<Bet>;

  abstract update(data: IUpdateBetDTO, file?: any): Promise<Bet>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
