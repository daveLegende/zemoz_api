import { IIDParamDTO } from '../../../_shared/app/dto';
import { MVP } from '../../../mvp/domain';
import { ICreateMVPDTO } from '../dto';

export abstract class IMVPController {
  abstract fetchOne(param: IIDParamDTO): Promise<MVP>;

  abstract fetchAll(): Promise<MVP[]>;

  abstract create(data: ICreateMVPDTO, file?: any): Promise<MVP>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
