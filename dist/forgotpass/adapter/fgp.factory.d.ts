import { ForgotPass } from "../domain";
import { ICreateForgotPassDTO } from "../app/dto";
export declare abstract class ForgotPassFactory {
    static create(data: ICreateForgotPassDTO): Promise<ForgotPass>;
    static getFgp(fgp: ForgotPass): ForgotPass;
}
