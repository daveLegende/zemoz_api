import { IIDParamDTO } from '../../../_shared/app/dto';
import { Match } from '../../../match/domain';
import { ICreateMatchDTO, IUpdateMatchDTO } from '../dto';
import { PaginationOptionsDto } from '../../../_shared/adapter/dto/pagination-options.dto';
import { PaginationResultDto } from '../../../_shared/adapter/dto/pagination-result.dto';

export abstract class IMatchController {
  abstract all(options: PaginationOptionsDto): Promise<PaginationResultDto<Match>>;

  abstract show(param: IIDParamDTO): Promise<Match>;

  abstract create(data: ICreateMatchDTO, file?: any): Promise<Match>;

  abstract search(data: Partial<Match>, file?: any): Promise<Match>;

  abstract update(data: IUpdateMatchDTO, file?: any): Promise<Match>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  // abstract uploadLogo(id: string, file: Express.Multer.File): Promise<Match>;
}
