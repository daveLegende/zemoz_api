import { ITimestamp } from "domain/interface";
import { User } from "user/domain";

export class ForgotPass extends ITimestamp {
    id: string;
    code: string;
    email: string;
}