/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IIDParamDTO } from 'app/dto';
import { Team } from '../../domain';
import { ICreateTeamDTO, IUpdateTeamDTO } from '../dto';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class ITeamController {
  abstract all(options: PaginationOptionsDto): Promise<PaginationResultDto<Team>>;

  abstract show(param: IIDParamDTO): Promise<Team>;

  abstract create(data: ICreateTeamDTO, file?: any): Promise<Team>;

  abstract search(data: Partial<Team>, file?: any): Promise<Team>;

  abstract update(data: IUpdateTeamDTO, file?: any): Promise<Team>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
