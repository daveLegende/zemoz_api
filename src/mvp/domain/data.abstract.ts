import { IGenericRepository } from '../../igeneric.interface';
import { MVP } from './mvp.model';

export abstract class IMVPRepository {
  abstract mvps: IGenericRepository<MVP>;
}
