import { ITimestamp } from '../../_shared/domain/interface';
import { Team } from '../../team/domain/team.model';
import { Player } from './player.model';

export class TeamPlayer extends ITimestamp {
  id: string;
  player: Player;
  team: Team;
  numeroMaillot?: number;
  poste?: string;
  buts: number;
  passes: number;
  statut?: string;
}
