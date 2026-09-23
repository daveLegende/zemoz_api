import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './schema/account.entity';
import { DBGenericRepository } from '../../../_shared/framework/database.repository';
import { IAccountRepository } from '../../domain/data.abstract';

@Injectable()
export class AccountRepository implements IAccountRepository, OnApplicationBootstrap {
  accounts: DBGenericRepository<AccountEntity>;

  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  onApplicationBootstrap(): void {
    this.accounts = new DBGenericRepository<AccountEntity>(this.accountRepository);
  }
}
