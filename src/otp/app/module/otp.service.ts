import { Otp } from '../../../otp/domain';
import { ICreateOtpDTO } from '../dto';

export abstract class IOtpService {
  abstract add(data: ICreateOtpDTO): Promise<Otp>;

  // abstract update(data: IUpdateOtpDTO): Promise<Otp>;

  abstract fetchOne(id: string): Promise<Otp>;

  abstract remove(id: string): Promise<boolean>;
}
