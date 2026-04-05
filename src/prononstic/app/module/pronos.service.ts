import { Prononstic } from "../../domain";
import { ICreatePronosDTO, IUpdatePronosDTO } from "../dto";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";


export abstract class IPrononsticService {
  abstract add(data: ICreatePronosDTO): Promise<Prononstic>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Prononstic>>;

  abstract fetchOne(id: string): Promise<Prononstic>;

  abstract edit(data: IUpdatePronosDTO): Promise<Prononstic>;

  abstract remove(id: string): Promise<boolean>;
}
