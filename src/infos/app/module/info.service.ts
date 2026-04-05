import { Info } from "../../../infos/domain";
import { ICreateInfoDTO, IUpdateInfoDTO } from "../dto";
import { Express } from "express";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";

export abstract class IInfoService {
  abstract add(data: ICreateInfoDTO, file?: Express.Multer.File): Promise<Info>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Info>>;

  abstract fetchOne(id: string): Promise<Info>;

  abstract edit(data: IUpdateInfoDTO, file?: Express.Multer.File): Promise<Info>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Info>): Promise<Info>;

  abstract remove(id: string): Promise<boolean>;
}
