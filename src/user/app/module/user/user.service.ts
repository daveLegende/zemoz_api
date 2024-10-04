import { IChangePasswordDTO, ICreateUserDTO, IReinitialisePassDTO, IUpdateUserDTO } from 'user/app/dto';
import { User } from 'user/domain';

export abstract class IUserService {
  abstract add(data: ICreateUserDTO): Promise<User>;

  abstract fetchAll(): Promise<User[]>;

  abstract fetchOne(id: string): Promise<User>;

  abstract edit(data: IUpdateUserDTO): Promise<User>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<User>): Promise<User>;

  abstract remove(id: string): Promise<boolean>;

  // abstract fetchByEmail(email: string): Promise<User>;

  abstract fetchByPhone(phone: string): Promise<User>;

  abstract reinitialisePass(data: IReinitialisePassDTO): Promise<User>;

  abstract changePass(data: IChangePasswordDTO): Promise<User>;

}
