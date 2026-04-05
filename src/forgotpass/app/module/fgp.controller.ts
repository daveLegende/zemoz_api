import { IIDParamDTO } from '../../../_shared/app/dto';
import { ICreateForgotPassDTO, IUpdateForgotPassDTO } from '../dto';
import { ForgotPass } from '../../../forgotpass/domain';

export abstract class IForgotPassController {
  abstract all(): Promise<ForgotPass[]>;

  abstract show(param: IIDParamDTO): Promise<ForgotPass>;

  abstract create(data: ICreateForgotPassDTO, file?: any): Promise<ForgotPass>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  abstract verifyCode(data: ICreateForgotPassDTO, file?: any): Promise<boolean>;
}
