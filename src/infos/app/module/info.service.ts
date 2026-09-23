import { Info } from "../../../infos/domain";
import { ICreateInfoDTO, IUpdateInfoDTO } from "../dto";
import { Express } from "express";

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IInfoService {
  abstract add(data: ICreateInfoDTO, file?: Express.Multer.File): Promise<Info>;

  abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<Info>>;

  abstract fetchOne(id: string): Promise<Info>;

  abstract edit(data: IUpdateInfoDTO, file?: Express.Multer.File): Promise<Info>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Info>): Promise<Info>;

  abstract remove(id: string): Promise<boolean>;
}
