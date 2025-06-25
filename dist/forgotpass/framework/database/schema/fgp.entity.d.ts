import { ForgotPass } from "src/forgotpass/domain";
export declare class ForgotPassEntity extends ForgotPass {
    id: string;
    code: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
