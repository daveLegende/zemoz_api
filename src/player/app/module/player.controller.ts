import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IIDParamDTO } from 'app/dto';
import { Player, TeamPlayer } from '../../domain';
import { ICreatePlayerDTO, ICreateTeamPlayerDTO, IUpdatePlayerDTO, IUpdateTeamPlayerDTO } from '../dto';

export abstract class IPlayerController {
  abstract all(query?: PaginationQuery): Promise<PaginatedResult<Player>>;

  abstract show(param: IIDParamDTO): Promise<Player>;

  abstract byTournoi(param: { tournoiId: string }): Promise<TeamPlayer[]>;

  abstract history(param: IIDParamDTO): Promise<TeamPlayer[]>;

  abstract create(data: ICreatePlayerDTO, file?: any): Promise<Player>;

  abstract createInscription(param: IIDParamDTO, data: ICreateTeamPlayerDTO): Promise<TeamPlayer>;

  abstract search(data: Partial<Player>, file?: any): Promise<Player>;

  abstract update(data: IUpdatePlayerDTO, file?: any): Promise<Player>;

  abstract updateInscription(data: IUpdateTeamPlayerDTO): Promise<TeamPlayer>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  abstract removeInscription(param: { id: string }): Promise<boolean>;
}
