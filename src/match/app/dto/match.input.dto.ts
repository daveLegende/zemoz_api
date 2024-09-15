import { MatchScores, MatchState, MatchType } from "src/match/domain";
import { MatchEvent } from "src/matchEvents/domain";

export interface ICreateMatchDTO {
  lieu: string;

  type: MatchType;

  etat?: MatchState;
  
  journee?: number;
  
  date: Date;

  arbitres: string[],
  
  home: string;
  
  away: string;
  
  scores?: Record<string, any>;
  
  events?: MatchEvent[];
  
  poule?: string;

}
export interface IUpdateMatchDTO extends Partial<ICreateMatchDTO> {
  id: string;
}
