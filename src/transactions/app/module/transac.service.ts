import { Transaction } from "../../domain";
import { ICreatePassDTO, ICreateTransactionDTO, IUpdateTransactionDTO } from "../dto";

export abstract class ITransactionService {
  abstract add(data: ICreateTransactionDTO, pass: ICreatePassDTO): Promise<Transaction>;

  abstract fetchAll(): Promise<Transaction[]>;

  abstract fetchOne(id: string): Promise<Transaction>;

  abstract edit(data: IUpdateTransactionDTO): Promise<Transaction>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Transaction>): Promise<Transaction>;

  abstract remove(id: string): Promise<boolean>;

  abstract userTransac(data: ICreateTransactionDTO): Promise<Transaction>;

}
