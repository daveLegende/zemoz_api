import { IIDParamDTO } from '../../../_shared/app/dto';
import { Info } from '../../../infos/domain';
import { ICreateInfoDTO, IUpdateInfoDTO } from '../dto';

export abstract class IInfoController {
  abstract all(): Promise<Info[]>;

  abstract show(param: IIDParamDTO): Promise<Info>;

  abstract create(data: ICreateInfoDTO, file?: any): Promise<Info>;

  abstract search(data: Partial<Info>, file?: any): Promise<Info>;

  abstract update(data: IUpdateInfoDTO, file?: any): Promise<Info>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
