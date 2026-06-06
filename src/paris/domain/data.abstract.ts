import { IGenericRepository } from '../../igeneric.interface';
import { Paris } from './paris.model';

export abstract class IParisRepository {
  abstract paris: IGenericRepository<Paris>;
}
