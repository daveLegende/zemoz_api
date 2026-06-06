import { ITimestamp } from '../../_shared/domain/interface';
import { RoleArbitre } from './arbitre.enum';
import { Match } from '../../match/domain';

export class Arbitre extends ITimestamp {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  role?: RoleArbitre;
  matchs: Match[];
}
