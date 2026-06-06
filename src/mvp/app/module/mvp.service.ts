import { MVP } from '../../../mvp/domain';
import { ICreateMVPDTO } from '../dto';

export abstract class IMVPService {
  abstract add(data: ICreateMVPDTO): Promise<MVP>;

  abstract fetchOne(id: string): Promise<MVP>;

  abstract remove(id: string): Promise<boolean>;

  abstract fetchAll(): Promise<MVP[]>;
}
