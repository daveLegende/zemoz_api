import { IGenericRepository } from "src/igeneric.interface";
import { Transaction } from "./transaction.model";

export abstract class ITransactionRepository {
    abstract transactions: IGenericRepository<Transaction>;
}