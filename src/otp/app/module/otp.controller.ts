import { IIDParamDTO } from '../../../_shared/app/dto';
import { Otp } from '../../../otp/domain';
import { ICreateOtpDTO } from '../dto';

export abstract class IOtpController {
  abstract show(param: IIDParamDTO): Promise<Otp>;

  abstract create(data: ICreateOtpDTO, file?: any): Promise<Otp>;

  // abstract update(data: IUpdateOtpDTO): Promise<Otp>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
