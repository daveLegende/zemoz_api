import { IIDParamDTO } from '../../../_shared/app/dto';
import { Bet } from '../../../bet/domain';
import { ICreateBetDTO, IUpdateBetDTO } from '../dto';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class IBetController {
  abstract all(options: PaginationOptionsDto): Promise<PaginationResultDto<Bet>>;

  abstract show(param: IIDParamDTO): Promise<Bet>;

  abstract create(data: ICreateBetDTO, file?: any): Promise<Bet>;

  abstract search(data: Partial<Bet>, file?: any): Promise<Bet>;

  abstract update(data: IUpdateBetDTO, file?: any): Promise<Bet>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
