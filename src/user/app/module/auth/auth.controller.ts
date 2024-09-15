import { IForgotPasswordDTO, ISigninUserDTO } from '../../dto/auth.input.dto';
import { SignedUserDTO } from '../../dto/user.output.dto';

export abstract class IAuthController {
  abstract signin(data: ISigninUserDTO): Promise<SignedUserDTO>;

  abstract forgotPassword(data: IForgotPasswordDTO): Promise<boolean>;
}
