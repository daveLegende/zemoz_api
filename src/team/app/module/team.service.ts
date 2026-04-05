import { Team } from "../../domain";
import { ICreateTeamDTO, IUpdateTeamDTO } from "../dto";
import { Express } from "express";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";


export abstract class ITeamService {
  abstract add(data: ICreateTeamDTO, file?: Express.Multer.File): Promise<Team>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Team>>;

  abstract fetchOne(id: string): Promise<Team>;

  abstract edit(data: IUpdateTeamDTO, file?: Express.Multer.File): Promise<Team>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Team>): Promise<Team>;

  abstract remove(id: string): Promise<boolean>;
}
