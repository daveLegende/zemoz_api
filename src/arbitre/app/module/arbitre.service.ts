import { Arbitre } from "../../domain";
import { ICreateArbitreDTO, IUpdateArbitreDTO } from "../dto";
import { Express } from 'express';


import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IArbitreService {
  abstract add(data: ICreateArbitreDTO, file?: Express.Multer.File): Promise<Arbitre>;

  abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<Arbitre>>;

  abstract fetchOne(id: string): Promise<Arbitre>;

  abstract edit(data: IUpdateArbitreDTO, file?: Express.Multer.File): Promise<Arbitre>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Arbitre>): Promise<Arbitre>;

  abstract remove(id: string): Promise<boolean>;
}
