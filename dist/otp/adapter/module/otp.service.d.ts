import { OtpAccountDto } from '../dto';
import { IOtpService } from 'src/otp/app/module';
import { IOtpRepository, Otp } from 'src/otp/domain';
import { TwilioService } from 'src/twilio/twilio.service';
export declare class OtpService implements IOtpService {
    private otpRepository;
    private twilioService;
    private readonly logger;
    constructor(otpRepository: IOtpRepository, twilioService: TwilioService);
    fetchOne(id: string): Promise<Otp>;
    add(data: OtpAccountDto): Promise<Otp>;
    remove(id: string): Promise<boolean>;
    verifyOtp(phone: string, code: string): Promise<boolean>;
}
