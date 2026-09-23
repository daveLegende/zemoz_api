import { IIDParamDTO } from '../../../_shared/app/dto';
import { ICreateForgotPassDTO, IUpdateForgotPassDTO } from '../dto';
import { ForgotPass } from '../../../forgotpass/domain';

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IForgotPassController {
  abstract all(query?: PaginationQuery): Promise<PaginatedResult<ForgotPass>>;

  abstract show(param: IIDParamDTO): Promise<ForgotPass>;

  abstract create(data: ICreateForgotPassDTO, file?: any): Promise<ForgotPass>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  abstract verifyCode(data: ICreateForgotPassDTO, file?: any): Promise<boolean>;
}
