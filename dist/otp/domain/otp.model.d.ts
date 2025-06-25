import { ITimestamp } from "domain/interface";
export declare class Otp extends ITimestamp {
    id: string;
    code: string;
    phone: string;
    isVerified: boolean;
    expiresAt: Date;
}
