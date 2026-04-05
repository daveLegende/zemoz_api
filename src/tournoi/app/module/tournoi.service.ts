import { Tournoi } from "../../domain";
import { ICreateTournoiDTO, IUpdateTournoiDTO } from "../dto";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";


export abstract class ITournoiService {
  abstract add(data: ICreateTournoiDTO): Promise<Tournoi>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Tournoi>>;

  abstract fetchOne(id: string): Promise<Tournoi>;

  abstract edit(data: IUpdateTournoiDTO): Promise<Tournoi>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Tournoi>): Promise<Tournoi>;

  abstract remove(id: string): Promise<boolean>;
}
