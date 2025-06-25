import { IDParamDTO } from 'adapter/dto';
import { IOtpController } from 'src/otp/app/module';
import { OtpAccountDto } from '../dto';
import { Otp } from 'src/otp/domain';
import { OtpService } from './otp.service';
export declare class OtpController implements IOtpController {
    private readonly otpService;
    constructor(otpService: OtpService);
    show({ id }: IDParamDTO): Promise<Otp>;
    create(data: OtpAccountDto): Promise<Otp>;
    remove({ id }: IDParamDTO): Promise<boolean>;
    verifyOTP(phone: string, code: string): Promise<Boolean>;
}
