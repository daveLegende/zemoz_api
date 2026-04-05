import { IIDParamDTO } from 'app/dto';
import { Poule } from '../../domain';
import { ICreatePouleDTO, IUpdatePouleDTO } from '../dto';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class IPouleController {
  abstract all(options: PaginationOptionsDto): Promise<PaginationResultDto<Poule>>;

  abstract show(param: IIDParamDTO): Promise<Poule>;

  abstract create(data: ICreatePouleDTO, file?: any): Promise<Poule>;

  abstract search(data: Partial<Poule>, file?: any): Promise<Poule>;

  abstract update(data: IUpdatePouleDTO, file?: any): Promise<Poule>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
