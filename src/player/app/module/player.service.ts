import { Player } from "../../domain";
import { ICreatePlayerDTO, IUpdatePlayerDTO } from "../dto";
import { Express } from 'express';
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";


export abstract class IPlayerService {
  abstract add(data: ICreatePlayerDTO, file?: Express.Multer.File): Promise<Player>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Player>>;

  abstract fetchOne(id: string): Promise<Player>;

  abstract edit(data: IUpdatePlayerDTO, file?: Express.Multer.File): Promise<Player>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Player>): Promise<Player>;

  abstract remove(id: string): Promise<boolean>;
}
