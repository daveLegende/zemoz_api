import { Otp } from "src/otp/domain";
import { ICreateOtpDTO } from "../dto";
export declare abstract class IOtpService {
    abstract add(data: ICreateOtpDTO): Promise<Otp>;
    abstract fetchOne(id: string): Promise<Otp>;
    abstract remove(id: string): Promise<boolean>;
}
