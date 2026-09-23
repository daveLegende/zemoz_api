import { MVP } from "../../../mvp/domain";
import { ICreateMVPDTO } from "../dto";

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IMVPService {
  abstract add(data: ICreateMVPDTO): Promise<MVP>;

  abstract fetchOne(id: string): Promise<MVP>;

  abstract remove(id: string): Promise<boolean>;

  abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<MVP>>;
}
