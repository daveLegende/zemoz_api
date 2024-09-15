import { Info } from "src/infos/domain";
import { ICreateInfoDTO, IUpdateInfoDTO } from "../dto";

export abstract class IInfoService {
  abstract add(data: ICreateInfoDTO): Promise<Info>;

  abstract fetchAll(): Promise<Info[]>;

  abstract fetchOne(id: string): Promise<Info>;

  abstract edit(data: IUpdateInfoDTO): Promise<Info>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Info>): Promise<Info>;

  abstract remove(id: string): Promise<boolean>;
}
