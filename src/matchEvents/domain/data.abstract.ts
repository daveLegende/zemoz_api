import { IGenericRepository } from '../../igeneric.interface';
import { MatchEvent } from './match.events.model';

export abstract class IMatchEventRepository {
  abstract events: IGenericRepository<MatchEvent>;

  abstract save(events: MatchEvent): Promise<MatchEvent>;
}
