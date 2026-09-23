import { ITimestamp } from '../../_shared/domain/interface';
import { TeamPlayer } from './team-player.model';

export class Player extends ITimestamp {
  id: string;
  name: string;
  age?: number;
  phone?: string;
  avatar?: string;
  inscriptions?: TeamPlayer[];
}
