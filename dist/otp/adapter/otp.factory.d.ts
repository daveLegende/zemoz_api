import { Otp } from "../domain";
import { ICreateOtpDTO, IUpdateOtpDTO } from "../app/dto";
export declare abstract class OtpFactory {
    static create(data: ICreateOtpDTO): Promise<Otp>;
    static update(otp: Otp, data: IUpdateOtpDTO): Otp;
    static getOtp(otp: Otp): Otp;
}
