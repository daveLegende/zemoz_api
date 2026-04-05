import { Arbitre } from "../../domain";
import { ICreateArbitreDTO, IUpdateArbitreDTO } from "../dto";
import { Express } from 'express';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";


export abstract class IArbitreService {
  abstract add(data: ICreateArbitreDTO, file?: Express.Multer.File): Promise<Arbitre>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Arbitre>>;

  abstract fetchOne(id: string): Promise<Arbitre>;

  abstract edit(data: IUpdateArbitreDTO, file?: Express.Multer.File): Promise<Arbitre>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Arbitre>): Promise<Arbitre>;

  abstract remove(id: string): Promise<boolean>;
}
