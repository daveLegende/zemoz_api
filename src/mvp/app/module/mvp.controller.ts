import { IIDParamDTO } from '../../../_shared/app/dto';
import { MVP } from '../../../mvp/domain';
import { ICreateMVPDTO } from '../dto';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class IMVPController {

  abstract fetchOne(param: IIDParamDTO): Promise<MVP>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<MVP>>;

  abstract create(data: ICreateMVPDTO, file?: any): Promise<MVP>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
