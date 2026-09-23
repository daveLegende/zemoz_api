import { Transaction } from "../domain";
import { ICreateTransactionDTO, IUpdateTransactionDTO } from "../app/dto";
import { Account } from "../../account/domain/account.model";

export abstract class TransactionFactory {
    static async create(data: ICreateTransactionDTO, account: Account): Promise<Transaction> {
        const transaction = new Transaction();

        transaction.phone = data.phone;
        transaction.account = account;
        transaction.amount = data.amount;
        transaction.type = data.type;
        transaction.frais = data.frais;

        return transaction;
    }

    static update(transaction: Transaction, data: IUpdateTransactionDTO): Transaction {
        transaction.type = data.type ?? transaction.type;
        transaction.amount = data.amount ?? transaction.amount;
        transaction.phone = transaction.phone;
        transaction.account = transaction.account;
        transaction.frais = transaction.frais;
    
        return transaction;
    }
    
    static getTransaction(transaction: Transaction): Transaction {
        if (transaction) {
          return {
            id: transaction.id,
            type: transaction.type,
            amount: transaction.amount,
            phone: transaction.phone,
            account: transaction.account,
            frais: transaction.frais,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt,
            deletedAt: transaction.deletedAt
          };
        }
    }
}