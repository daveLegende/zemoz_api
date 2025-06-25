import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { ITransactionRepository, Transaction } from 'src/transactions/domain';
import { Repository } from 'typeorm';
import { TransactionEntity } from './schema/transac.entity';
export declare class TransactionRepository implements ITransactionRepository, OnApplicationBootstrap {
    private transactionRepository;
    transactions: IGenericRepository<Transaction>;
    constructor(transactionRepository: Repository<TransactionEntity>);
    save(Transaction: TransactionEntity): Promise<TransactionEntity>;
    onApplicationBootstrap(): void;
}
