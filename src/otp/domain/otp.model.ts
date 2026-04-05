import { ITimestamp } from "../../_shared/domain/interface";

export class Otp extends ITimestamp {
    id: string;
    code: string;
    phone: string;
    isVerified: boolean;
    expiresAt: Date;
}