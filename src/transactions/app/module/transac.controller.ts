import { IIDParamDTO } from 'app/dto';
import { Transaction } from '../../domain';
import { ICreatePassDTO, ICreateTransactionDTO, IUpdateTransactionDTO } from '../dto';

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class ITransactionController {
  abstract all(query?: PaginationQuery): Promise<PaginatedResult<Transaction>>;

  abstract show(param: IIDParamDTO): Promise<Transaction>;

  abstract create(data: ICreateTransactionDTO, file?: any): Promise<Transaction>;

  abstract search(data: Partial<Transaction>, file?: any): Promise<Transaction>;

  abstract update(data: IUpdateTransactionDTO, file?: any): Promise<Transaction>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  abstract userTransac(data: ICreateTransactionDTO, file?: any): Promise<Transaction>;
}
