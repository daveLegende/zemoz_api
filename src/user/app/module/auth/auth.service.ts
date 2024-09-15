import { ISigninUserDTO, IForgotPasswordDTO, ICreateUserDTO } from 'user/app/dto';
import { User } from 'user/domain';

export abstract class IAuthService {
  abstract signin(
    data: ISigninUserDTO,
  ): Promise<{ accessToken: string; user: User }>;

  // abstract register(
  //   data: ICreateUserDTO,
  // ): Promise<{ accessToken: string; user: User }>;


  abstract forgotPassword(data: IForgotPasswordDTO): Promise<boolean>;
}
