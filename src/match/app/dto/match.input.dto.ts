import { MatchScores, MatchState, MatchType } from "../../../match/domain";
import { MatchEvent } from "../../../matchEvents/domain";

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

  isProlongation?: boolean;

  isTirAuxButs?: boolean;

  homePenalty?: number;

  awayPenalty?: number;
  
  teamQualify?: string;
  
  // Ajoutez les cotes (optionnelles si vous voulez les rendre obligatoires plus tard)
  odds?: {
    V1: number;  // Cote pour la victoire à domicile (ex: 1.80)
    X: number;   // Cote pour le match nul (ex: 3.50)
    V2: number;  // Cote pour la victoire à l'extérieur (ex: 4.20)
  };

}
export interface IUpdateMatchDTO extends Partial<ICreateMatchDTO> {
  id: string;
}
