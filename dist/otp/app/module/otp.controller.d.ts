import { IIDParamDTO } from 'app/dto';
import { Otp } from 'src/otp/domain';
import { ICreateOtpDTO } from '../dto';
export declare abstract class IOtpController {
    abstract show(param: IIDParamDTO): Promise<Otp>;
    abstract create(data: ICreateOtpDTO, file?: any): Promise<Otp>;
    abstract remove(param: IIDParamDTO): Promise<boolean>;
}
