import { IIDParamDTO } from '../../../_shared/app/dto';
import { MVP } from '../../../mvp/domain';
import { ICreateMVPDTO } from '../dto';

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IMVPController {

  abstract fetchOne(param: IIDParamDTO): Promise<MVP>;

  abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<MVP>>;

  abstract fetchByMatch(param: IIDParamDTO, query?: PaginationQuery): Promise<PaginatedResult<MVP>>;

  abstract fetchByTournoi(param: IIDParamDTO, query?: PaginationQuery): Promise<PaginatedResult<MVP>>;

  abstract create(data: ICreateMVPDTO, file?: any): Promise<MVP>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
