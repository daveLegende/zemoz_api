/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IIDParamDTO } from 'app/dto';
import { Player } from '../../domain';
import { ICreatePlayerDTO, IUpdatePlayerDTO } from '../dto';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class IPlayerController {
  abstract all(options: PaginationOptionsDto): Promise<PaginationResultDto<Player>>;

  abstract show(param: IIDParamDTO): Promise<Player>;

  abstract create(data: ICreatePlayerDTO, file?: any): Promise<Player>;

  abstract search(data: Partial<Player>, file?: any): Promise<Player>;

  abstract update(data: IUpdatePlayerDTO, file?: any): Promise<Player>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
