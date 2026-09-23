import { Team } from "../../domain";
import { ICreateTeamDTO, IUpdateTeamDTO } from "../dto";
import { Express } from "express";


import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class ITeamService {
  abstract add(data: ICreateTeamDTO, file?: Express.Multer.File, tournoiId?: string): Promise<Team>;

  abstract fetchAll(query?: PaginationQuery, tournoiId?: string): Promise<PaginatedResult<Team>>;

  abstract fetchOne(id: string, tournoiId?: string): Promise<Team>;

  abstract edit(data: IUpdateTeamDTO, file?: Express.Multer.File, tournoiId?: string): Promise<Team>;

  abstract setState(id: string, tournoiId?: string): Promise<boolean>;

  abstract search(data: Partial<Team>, tournoiId?: string): Promise<Team>;

  abstract remove(id: string, tournoiId?: string): Promise<boolean>;
}
