import { JwtService } from '@nestjs/jwt';
import { IUserService } from 'user/app/module/user';
import { IOtpRepository } from 'src/otp/domain';
import { TwilioService } from 'src/twilio/twilio.service';
import { SendOtpDTo, VerifyOtpDTo } from 'src/otp/adapter/dto';
import { IUserRepository, User } from 'user/domain';
export declare class AuthService {
    private usersService;
    private userRepository;
    private otpRepository;
    private twilioService;
    private jwtService;
    constructor(usersService: IUserService, userRepository: IUserRepository, otpRepository: IOtpRepository, twilioService: TwilioService, jwtService: JwtService);
    validateUser(phone: string, password: string): Promise<any>;
    login(user: any): Promise<{
        accessToken: string;
        refreshToken: string;
        user: User;
    }>;
    refreshTokens(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    sendOTP(data: SendOtpDTo): Promise<any>;
    verifyOtp(data: VerifyOtpDTo): Promise<boolean>;
}
