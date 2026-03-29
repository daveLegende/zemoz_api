import { ITimestamp } from '../../_shared/domain/interface';
import { Team } from '../../team/domain';

export class Player extends ITimestamp {
  id: string;
  name: string;
  age?: number;
  phone?: string;
  avatar?: string;
  buts?: number;
  passes?: number;
  team: Team;
}
