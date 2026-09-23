import { ITimestamp } from '../../_shared/domain/interface';
import { Player } from '../../player/domain/player.model';
import { TeamPlayer } from '../../player/domain/team-player.model';
import { Poule } from '../../poule/domain';
import { Tournoi } from '../../tournoi/domain';

export class Team extends ITimestamp {
  id: string;
  name: string;
  logo?: string;
  coach?: string;
  commune?: string;
  points?: number;
  matchJoues?: number;
  butMarques?: number;
  butConcedes?: number;
  joueurs?: Player[];
  inscriptions?: TeamPlayer[];
  poule?: Poule;
  tournoi?: Tournoi;
}
