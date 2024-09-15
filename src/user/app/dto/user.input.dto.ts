import { AccountRole, SexEnum } from '../../domain/user.enum';

export interface ICreateUserDTO {
  firstname: string;

  lastname: string;

  sex?: SexEnum;

  email?: string;

  phone: string;

  country: string;

  avatar?: string;

  password: string;
  
  solde?: number;

}

export interface IUpdateUserDTO extends Partial<ICreateUserDTO> {
  id: string;
}
