import { Transaction } from "../domain";
import { ICreateTransactionDTO, IUpdateTransactionDTO } from "../app/dto";
import { Admin } from "src/admin/domain";
export declare abstract class TransactionFactory {
    static create(data: ICreateTransactionDTO, admin: Admin): Promise<Transaction>;
    static update(transaction: Transaction, data: IUpdateTransactionDTO): Transaction;
    static getTransaction(transaction: Transaction): Transaction;
}
