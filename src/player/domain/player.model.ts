import { ITimestamp } from 'domain/interface';
import { Team } from 'src/team/domain';

export class Player extends ITimestamp {
  id: string;
  firstname: string;
  lastname: string;
  age?: number;
  phone: string;
  avatar?: string;
  buts?: number;
  passes?: number;
  team: Team;
}
