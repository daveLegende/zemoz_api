import { Transaction } from '../domain';
import { ICreateTransactionDTO, IUpdateTransactionDTO } from '../app/dto';
import { User } from '../../user/domain';
import { Admin } from '../../admin/domain';

export abstract class TransactionFactory {
  static async create(
    data: ICreateTransactionDTO,
    admin: Admin,
    user: User,
  ): Promise<Transaction> {
    const transaction = new Transaction();

    transaction.phone = data.phone;
    transaction.admin = admin;
    transaction.amount = data.amount;
    transaction.type = data.type;
    transaction.user = user;
    transaction.frais = data.frais;

    return transaction;
  }

  static update(
    transaction: Transaction,
    data: IUpdateTransactionDTO,
  ): Transaction {
    transaction.type = data.type ?? transaction.type;
    transaction.amount = data.amount ?? transaction.amount;
    transaction.phone = transaction.phone;
    transaction.admin = transaction.admin;
    transaction.frais = transaction.frais;
    transaction.user = transaction.user;

    return transaction;
  }

  static getTransaction(transaction: Transaction): Transaction {
    if (transaction) {
      return {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        phone: transaction.phone,
        admin: transaction.admin,
        user: transaction.user,
        frais: transaction.frais,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        deletedAt: transaction.deletedAt,
      };
    }
  }
}
