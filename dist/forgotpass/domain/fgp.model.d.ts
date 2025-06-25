import { ITimestamp } from "domain/interface";
export declare class ForgotPass extends ITimestamp {
    id: string;
    code: string;
    email: string;
}
