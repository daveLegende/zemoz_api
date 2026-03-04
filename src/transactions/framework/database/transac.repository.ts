import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from 'framework/database.repository';
import { IGenericRepository } from '../../../igeneric.interface';
import { ITransactionRepository, Transaction } from '../../domain';
import { Repository } from 'typeorm';
import { TransactionEntity } from './schema/transac.entity';

@Injectable()
export class TransactionRepository implements ITransactionRepository, OnApplicationBootstrap {
    transactions: IGenericRepository<Transaction>;
    
    constructor(
        @InjectRepository(TransactionEntity)
        private transactionRepository: Repository<TransactionEntity>,
    ) {}

    async save(Transaction: TransactionEntity): Promise<TransactionEntity> {
        return await this.transactionRepository.save(Transaction);
    }

    onApplicationBootstrap(): void {
        this.transactions = new DBGenericRepository<TransactionEntity>(this.transactionRepository);
    }
}
