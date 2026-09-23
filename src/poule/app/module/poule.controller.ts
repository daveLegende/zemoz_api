import { IIDParamDTO } from 'app/dto';
import { Poule } from '../../domain';
import { ICreatePouleDTO, IUpdatePouleDTO } from '../dto';

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IPouleController {
  abstract all(query?: PaginationQuery): Promise<PaginatedResult<Poule>>;

  abstract show(param: IIDParamDTO): Promise<Poule>;

  abstract create(data: ICreatePouleDTO, file?: any): Promise<Poule>;

  abstract search(data: Partial<Poule>, file?: any): Promise<Poule>;

  abstract update(data: IUpdatePouleDTO, file?: any): Promise<Poule>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
