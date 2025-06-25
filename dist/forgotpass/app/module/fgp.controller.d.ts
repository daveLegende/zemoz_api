import { IIDParamDTO } from 'app/dto';
import { ICreateForgotPassDTO } from '../dto';
import { ForgotPass } from 'src/forgotpass/domain';
export declare abstract class IForgotPassController {
    abstract all(): Promise<ForgotPass[]>;
    abstract show(param: IIDParamDTO): Promise<ForgotPass>;
    abstract create(data: ICreateForgotPassDTO, file?: any): Promise<ForgotPass>;
    abstract remove(param: IIDParamDTO): Promise<boolean>;
    abstract verifyCode(data: ICreateForgotPassDTO, file?: any): Promise<boolean>;
}
