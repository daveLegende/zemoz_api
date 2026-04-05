import { IIDParamDTO } from 'app/dto';
import { Transaction } from '../../domain';
import { ICreatePassDTO, ICreateTransactionDTO, IUpdateTransactionDTO } from '../dto';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class ITransactionController {
  abstract all(options: PaginationOptionsDto): Promise<PaginationResultDto<Transaction>>;

  abstract show(param: IIDParamDTO): Promise<Transaction>;

  abstract create(data: ICreateTransactionDTO, file?: any): Promise<Transaction>;

  abstract search(data: Partial<Transaction>, file?: any): Promise<Transaction>;

  abstract update(data: IUpdateTransactionDTO, file?: any): Promise<Transaction>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  abstract userTransac(data: ICreateTransactionDTO, file?: any): Promise<Transaction>;
}
