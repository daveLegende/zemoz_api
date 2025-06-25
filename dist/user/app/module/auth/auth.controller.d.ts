import { IForgotPasswordDTO, ISigninUserDTO } from '../../dto/auth.input.dto';
import { SignedUserDTO } from '../../dto/user.output.dto';
export declare abstract class IAuthController {
    abstract signin(data: ISigninUserDTO): Promise<SignedUserDTO>;
    abstract forgotPassword(data: IForgotPasswordDTO): Promise<boolean>;
    abstract sendOTP(phone: String): Promise<any>;
    abstract verifyOTP(phone: string, otp: string): Promise<any>;
}
