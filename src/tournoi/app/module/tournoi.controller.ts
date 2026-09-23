/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IIDParamDTO } from 'app/dto';
import { Tournoi } from '../../domain';
import { ICreateTournoiDTO, IUpdateTournoiDTO } from '../dto';
import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';

export abstract class ITournoiController {
  abstract all(query?: PaginationQuery): Promise<PaginatedResult<Tournoi>>;

  abstract show(param: IIDParamDTO): Promise<Tournoi>;

  abstract create(data: ICreateTournoiDTO, file?: any): Promise<Tournoi>;

  abstract search(data: Partial<Tournoi>, file?: any): Promise<Tournoi>;

  abstract update(data: IUpdateTournoiDTO, file?: any): Promise<Tournoi>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
