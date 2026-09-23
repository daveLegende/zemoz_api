import { SexEnum } from '../../user/domain/user.enum';
import { PlatformRole } from './account.enum';

export interface Account {
  id: string;
  firstname: string;
  lastname: string;
  email?: string;
  phone: string;
  solde: number;
  sex?: SexEnum;
  country?: string;
  isActivated: boolean;
  password?: string;
  avatar?: string;
  platformRole: PlatformRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
