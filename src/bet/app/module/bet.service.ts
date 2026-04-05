import { Bet } from "../../../bet/domain";
import { ICreateBetDTO, IUpdateBetDTO } from "../dto";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";


export abstract class IBetService {
  abstract add(data: ICreateBetDTO): Promise<Bet>;

  // abstract addMultiple(data: ICreateMultipleBetsDto): Promise<Bet[]>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Bet>>;

  abstract fetchOne(id: string): Promise<Bet>;

  abstract edit(data: IUpdateBetDTO): Promise<Bet>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Bet>): Promise<Bet>;

  abstract remove(id: string): Promise<boolean>;
}
