import { ITimestamp } from 'domain/interface';
import { Player } from 'src/player/domain';
import { Poule } from 'src/poule/domain';

export class Team extends ITimestamp {
  id: string;
  name: string;
  logo?: string;
  coach: string;
  commune: string;
  points?: number;
  matchJoues?: number;
  butMarques?: number;
  butConcedes?: number;
  joueurs: Player[];
  poule?: Poule;
}
