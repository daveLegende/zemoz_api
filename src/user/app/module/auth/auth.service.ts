import { ISigninUserDTO, IForgotPasswordDTO } from '../../dto';
import { User } from '../../../domain';

export abstract class IAuthService {
  abstract signin(
    data: ISigninUserDTO,
  ): Promise<{ accessToken: string; user: User }>;

  // abstract register(
  //   data: ICreateUserDTO,
  // ): Promise<{ accessToken: string; user: User }>;

  abstract forgotPassword(data: IForgotPasswordDTO): Promise<boolean>;

  abstract sendOTP(phone: string): Promise<any>;

  abstract verifyOTP(phone: string, otp: string): Promise<any>;
}
