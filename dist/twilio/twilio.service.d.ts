import { ConfigService } from '@nestjs/config';
export declare class TwilioService {
    private configService;
    private client;
    constructor(configService: ConfigService);
    sendOtp(to: string, otp: string): Promise<any>;
}
