import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ITransactionRepository } from 'src/transactions/domain';
import { TransactionEntity } from './schema/transac.entity';
import { TransactionRepository } from './transac.repository';


@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [
    {
      provide: ITransactionRepository,
      useClass: TransactionRepository,
    },
  ],
  exports: [ITransactionRepository],
})
export class TransactionRepositoryModule {}
