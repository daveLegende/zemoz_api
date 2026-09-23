import { Tournoi } from "../../domain";
import { ICreateTournoiDTO, IUpdateTournoiDTO } from "../dto";
import { PaginatedResult, PaginationQuery } from "../../../_shared/domain/pagination";


export abstract class ITournoiService {
  abstract add(data: ICreateTournoiDTO): Promise<Tournoi>;

  abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<Tournoi>>;

  abstract fetchOne(id: string): Promise<Tournoi>;

  abstract edit(data: IUpdateTournoiDTO): Promise<Tournoi>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Tournoi>): Promise<Tournoi>;

  abstract remove(id: string): Promise<boolean>;
}
