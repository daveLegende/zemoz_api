import { ITimestamp } from 'domain/interface';
import { AccountRole, SexEnum } from './user.enum';

export class User extends ITimestamp {
  id: string;
  firstname: string;
  lastname: string;
  country: string;
  sex: SexEnum;
  email?: string;
  phone: string;
  password?: string;
  avatar?: string;
  isActivated: boolean;
  solde: number;
}
