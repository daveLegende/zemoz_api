/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IIDParamDTO } from 'app/dto';
import { ICreateUserDTO, IUpdateUserDTO } from 'user/app/dto/user.input.dto';
import { User } from 'user/domain/user.model';

export abstract class IUserController {
  abstract all(): Promise<User[]>;

  abstract show(param: IIDParamDTO): Promise<User>;

  abstract create(data: ICreateUserDTO, file?: any): Promise<User>;

  abstract search(data: Partial<User>, file?: any): Promise<User>;

  abstract update(data: IUpdateUserDTO, file?: any): Promise<User>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
