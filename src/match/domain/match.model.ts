import { ITimestamp } from '../../_shared/domain/interface';
import { Poule } from '../../poule/domain';
import { Team } from '../../team/domain';
import { MatchType, MatchState, HalfPauseState } from './match.enum';
import { MatchScores } from './match.other.dto';
import { Arbitre } from '../../arbitre/domain';
import { MatchEvent } from '../../matchEvents/domain';
import { Bet } from '../../bet/domain';
import { Paris } from '../../paris/domain';

export class Match extends ITimestamp {
  id: string;
  lieu: string;
  type: MatchType;
  etat?: MatchState;
  journee?: number;
  date: Date;
  arbitres: Arbitre[];
  home: Team;
  away: Team;
  scores?: MatchScores;
  events?: MatchEvent[];
  poule?: Poule;
  bets?: Bet[];
  paris?: Paris[];
  isProlongation?: boolean;
  isTirAuxButs?: boolean;
  homePenalty?: number;
  awayPenalty?: number;
  teamQualify?: string;
  halfPauseState?: HalfPauseState;

  // A supprimer après
  odds?: {
    V1: number; // Cote pour la victoire à domicile
    X: number; // Cote pour le match nul
    V2: number; // Cote pour la victoire à l'extérieur
  };

  // getArbitreIds(): string[] {
  //   return this.arbitres.map(arbitre => arbitre.id);
  // }
}
