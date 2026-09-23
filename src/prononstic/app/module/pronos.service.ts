import { Prononstic } from "../../domain";
import { ICreatePronosDTO, IUpdatePronosDTO } from "../dto";


import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IPrononsticService {
  abstract add(data: ICreatePronosDTO): Promise<Prononstic>;

  abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<Prononstic>>;

  abstract fetchOne(id: string): Promise<Prononstic>;

  abstract edit(data: IUpdatePronosDTO): Promise<Prononstic>;

  abstract remove(id: string): Promise<boolean>;
}
