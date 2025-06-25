import { IGenericRepository } from "src/igeneric.interface";
import { Transaction } from "./transaction.model";
export declare abstract class ITransactionRepository {
    abstract transactions: IGenericRepository<Transaction>;
}
