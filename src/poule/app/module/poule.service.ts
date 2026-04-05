import { Poule } from "../../domain";
import { ICreatePouleDTO, IUpdatePouleDTO } from "../dto";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class IPouleService {
  abstract add(data: ICreatePouleDTO): Promise<Poule>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Poule>>;

  abstract fetchOne(id: string): Promise<Poule>;

  abstract edit(data: IUpdatePouleDTO): Promise<Poule>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Poule>): Promise<Poule>;

  abstract remove(id: string): Promise<boolean>;
}
