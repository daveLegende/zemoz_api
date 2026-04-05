/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IIDParamDTO } from 'app/dto';
import { Tournoi } from '../../domain';
import { ICreateTournoiDTO, IUpdateTournoiDTO } from '../dto';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class ITournoiController {
  abstract all(options: PaginationOptionsDto): Promise<PaginationResultDto<Tournoi>>;

  abstract show(param: IIDParamDTO): Promise<Tournoi>;

  abstract create(data: ICreateTournoiDTO, file?: any): Promise<Tournoi>;

  abstract search(data: Partial<Tournoi>, file?: any): Promise<Tournoi>;

  abstract update(data: IUpdateTournoiDTO, file?: any): Promise<Tournoi>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
