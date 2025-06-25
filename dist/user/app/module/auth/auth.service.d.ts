import { ISigninUserDTO, IForgotPasswordDTO } from 'user/app/dto';
import { User } from 'user/domain';
export declare abstract class IAuthService {
    abstract signin(data: ISigninUserDTO): Promise<{
        accessToken: string;
        user: User;
    }>;
    abstract forgotPassword(data: IForgotPasswordDTO): Promise<boolean>;
    abstract sendOTP(phone: String): Promise<any>;
    abstract verifyOTP(phone: string, otp: string): Promise<any>;
}
