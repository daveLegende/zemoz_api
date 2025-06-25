import { Otp } from "src/otp/domain";
export declare class OtpEntity extends Otp {
    id: string;
    code: string;
    phone: string;
    isVerified: boolean;
    expiresAt: Date;
}
