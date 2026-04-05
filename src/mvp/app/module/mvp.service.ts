import { MVP } from "../../../mvp/domain";
import { ICreateMVPDTO } from "../dto";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class IMVPService {
  abstract add(data: ICreateMVPDTO): Promise<MVP>;

  abstract fetchOne(id: string): Promise<MVP>;

  abstract remove(id: string): Promise<boolean>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<MVP>>;
}
