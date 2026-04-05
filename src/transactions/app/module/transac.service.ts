import { Transaction } from "../../domain";
import { ICreatePassDTO, ICreateTransactionDTO, IUpdateTransactionDTO } from "../dto";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class ITransactionService {
  abstract add(data: ICreateTransactionDTO): Promise<Transaction>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Transaction>>;

  abstract fetchOne(id: string): Promise<Transaction>;

  abstract edit(data: IUpdateTransactionDTO): Promise<Transaction>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Transaction>): Promise<Transaction>;

  abstract remove(id: string): Promise<boolean>;

  abstract userTransac(data: ICreateTransactionDTO): Promise<Transaction>;

}
