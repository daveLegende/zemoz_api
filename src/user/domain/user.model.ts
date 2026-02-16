import { ITimestamp } from 'domain/interface';
import { AccountRole, SexEnum } from './user.enum';
import { Ticket } from 'src/ticket/domain';
import { Paris } from 'src/paris/domain';
import { Transaction } from 'src/transactions/domain';

export class User extends ITimestamp {
  id: string;
  firstname: string;
  lastname: string;
  country?: string;
  sex: SexEnum;
  email?: string;
  phone: string;
  password?: string;
  avatar?: string;
  isActivated: boolean;
  solde: number;
  ticket?: Ticket[];
  paris?: Paris[];
  transactions?: Transaction[];
}
