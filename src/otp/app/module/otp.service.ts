import { Otp } from "src/otp/domain";
import { ICreateOtpDTO, IUpdateOtpDTO } from "../dto";

export abstract class IOtpService {
  abstract add(data: ICreateOtpDTO): Promise<Otp>;

  // abstract update(data: IUpdateOtpDTO): Promise<Otp>;

  abstract fetchOne(id: string): Promise<Otp>;

  abstract remove(id: string): Promise<boolean>;
}
