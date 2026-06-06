import { IGenericRepository } from '../../igeneric.interface';
import { Match } from './match.model';

export abstract class IMatchRepository {
  abstract matchs: IGenericRepository<Match>;

  abstract save(match: Match): Promise<Match>;
}
