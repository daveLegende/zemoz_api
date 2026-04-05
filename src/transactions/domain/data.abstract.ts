import { IGenericRepository } from "../../igeneric.interface";
import { Transaction } from "./transaction.model";

export abstract class ITransactionRepository {
    abstract transactions: IGenericRepository<Transaction>;
}