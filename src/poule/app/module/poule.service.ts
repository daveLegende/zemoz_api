import { Poule } from "../../domain";
import { ICreatePouleDTO, IUpdatePouleDTO } from "../dto";

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IPouleService {
  abstract add(data: ICreatePouleDTO, tournoiId?: string): Promise<Poule>;

  abstract fetchAll(query?: PaginationQuery, tournoiId?: string): Promise<PaginatedResult<Poule>>;

  abstract fetchOne(id: string, tournoiId?: string): Promise<Poule>;

  abstract edit(data: IUpdatePouleDTO, tournoiId?: string): Promise<Poule>;

  abstract setState(id: string, tournoiId?: string): Promise<boolean>;

  abstract search(data: Partial<Poule>, tournoiId?: string): Promise<Poule>;

  abstract remove(id: string, tournoiId?: string): Promise<boolean>;
}
