import { Player, TeamPlayer } from "../../domain";
import { ICreatePlayerDTO, ICreateTeamPlayerDTO, IUpdatePlayerDTO, IUpdateTeamPlayerDTO } from "../dto";
import { Express } from 'express';


import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IPlayerService {
  abstract add(data: ICreatePlayerDTO, file?: Express.Multer.File): Promise<Player>;

  abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<Player>>;

  abstract fetchOne(id: string): Promise<Player>;

  abstract fetchByTournoi(tournoiId: string): Promise<TeamPlayer[]>;

  abstract fetchPlayerHistory(playerId: string): Promise<TeamPlayer[]>;

  abstract addInscription(playerId: string, data: ICreateTeamPlayerDTO): Promise<TeamPlayer>;

  abstract edit(data: IUpdatePlayerDTO, file?: Express.Multer.File): Promise<Player>;

  abstract editPlayer(data: IUpdatePlayerDTO, file?: Express.Multer.File): Promise<Player>;

  abstract editInscription(data: IUpdateTeamPlayerDTO): Promise<TeamPlayer>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Player>): Promise<Player>;

  abstract remove(id: string): Promise<boolean>;

  abstract removeInscription(inscriptionId: string): Promise<boolean>;
}
