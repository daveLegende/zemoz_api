import { IIDParamDTO } from '../../../_shared/app/dto';
import { Info } from '../../../infos/domain';
import { ICreateInfoDTO, IUpdateInfoDTO } from '../dto';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class IInfoController {
  abstract all(options: PaginationOptionsDto): Promise<PaginationResultDto<Info>>;

  abstract show(param: IIDParamDTO): Promise<Info>;

  abstract create(data: ICreateInfoDTO, file?: any): Promise<Info>;

  abstract search(data: Partial<Info>, file?: any): Promise<Info>;

  abstract update(data: IUpdateInfoDTO, file?: any): Promise<Info>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
