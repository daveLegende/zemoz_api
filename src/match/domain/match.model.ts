import { ITimestamp } from 'domain/interface';
import { Poule } from 'src/poule/domain';
import { Team } from 'src/team/domain';
import { MatchType, MatchState } from './match.enum';
import { MatchScores } from './match.other.dto';
import { Arbitre } from 'src/arbitre/domain';
import { MatchEvent } from 'src/matchEvents/domain';
import { Bet } from 'src/bet/domain';
import { Ticket } from 'src/ticket/domain';

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
  isProlongation?: boolean;
  teamQualify?: string;

  // getArbitreIds(): string[] {
  //   return this.arbitres.map(arbitre => arbitre.id);
  // }
}


