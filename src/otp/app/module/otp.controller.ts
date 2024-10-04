import { IIDParamDTO } from 'app/dto';
import { Otp } from 'src/otp/domain';
import { ICreateOtpDTO, IUpdateOtpDTO } from '../dto';

export abstract class IOtpController {

  abstract show(param: IIDParamDTO): Promise<Otp>;

  abstract create(data: ICreateOtpDTO, file?: any): Promise<Otp>;

  // abstract update(data: IUpdateOtpDTO): Promise<Otp>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
