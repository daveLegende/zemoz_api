import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './schema/account.entity';
import { IAccountRepository } from '../../domain/data.abstract';
import { AccountRepository } from './account.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [
    {
      provide: IAccountRepository,
      useClass: AccountRepository,
    },
  ],
  exports: [IAccountRepository],
})
export class AccountRepositoryModule {}
