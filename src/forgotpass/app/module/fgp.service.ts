import { ForgotPass } from "../../../forgotpass/domain";
import { ICreateForgotPassDTO } from "../dto";

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IForgotPassService {
  abstract add(data: ICreateForgotPassDTO): Promise<ForgotPass>;

  abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<ForgotPass>>;

  abstract fetchOne(id: string): Promise<ForgotPass>;

  abstract remove(id: string): Promise<boolean>;

  abstract verifyCode(data: ICreateForgotPassDTO): Promise<boolean>;
}
