import { IIDParamDTO } from '../../../_shared/app/dto';
import { Paris } from '../../domain';
import { ICreateParisDTO, IUpdateParisDTO } from '../dto';

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IParisController {
  abstract all(query?: PaginationQuery): Promise<PaginatedResult<Paris>>;

  abstract show(param: IIDParamDTO): Promise<Paris>;

  abstract create(data: ICreateParisDTO, file?: any): Promise<Paris>;

  abstract search(data: Partial<Paris>, file?: any): Promise<Paris>;

  abstract update(data: IUpdateParisDTO, file?: any): Promise<Paris>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
