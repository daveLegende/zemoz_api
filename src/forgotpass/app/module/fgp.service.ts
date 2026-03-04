import { ForgotPass } from "../../../forgotpass/domain";
import { ICreateForgotPassDTO } from "../dto";

export abstract class IForgotPassService {
  abstract add(data: ICreateForgotPassDTO): Promise<ForgotPass>;

  abstract fetchAll(): Promise<ForgotPass[]>;

  abstract fetchOne(id: string): Promise<ForgotPass>;

  abstract remove(id: string): Promise<boolean>;

  abstract verifyCode(data: ICreateForgotPassDTO): Promise<boolean>;
}
