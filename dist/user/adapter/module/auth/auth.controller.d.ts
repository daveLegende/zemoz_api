import { AuthService } from './auth.service';
import { SigninAccoutDTO } from 'user/adapter/dto';
import { SendOtpDTo, VerifyOtpDTo } from 'src/otp/adapter/dto';
import { User } from 'user/domain';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: SigninAccoutDTO): Promise<{
        accessToken: string;
        refreshToken: string;
        user: User;
    }>;
    refreshToken(body: {
        refresh_token: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    sendOTP(data: SendOtpDTo): Promise<any>;
    verifyOTP(data: VerifyOtpDTo): Promise<Boolean>;
}
