import { Account } from './account.model';
import { IGenericRepository } from '../../igeneric.interface';

export abstract class IAccountRepository {
  abstract accounts: IGenericRepository<Account>;
}
