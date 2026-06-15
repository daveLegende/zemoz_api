import { Otp } from "../domain";
import { ICreateOtpDTO, IUpdateOtpDTO } from "../app/dto";

export abstract class OtpFactory {
    static async create(data: ICreateOtpDTO): Promise<Otp> {
        const otp = new Otp();

        otp.code = data.code;
        // otp.phone = data.phone;
        otp.email = data.email;
        otp.expiresAt = data.expiresAt;

        return otp;
    }

    static update(otp: Otp, data: IUpdateOtpDTO): Otp {

        otp.code = data.code ?? otp.code;
        // otp.phone = data.phone ?? otp.phone;
        otp.email = data.email ?? otp.email;
        otp.isVerified = data.isVerified ?? otp.isVerified;
        otp.expiresAt = data.expiresAt ?? otp.expiresAt;
    
        return otp;
      }

      static getOtp(otp: Otp): Otp {
        if (otp) {
          return {
            id: otp.id,
            // phone: otp.phone,
            email: otp.email,
            code: otp.code,
            isVerified: otp.isVerified,
            expiresAt: otp.expiresAt,
            createdAt: otp.createdAt,
            updatedAt: otp.updatedAt,
            deletedAt: otp.deletedAt
          };
        }
      }
}