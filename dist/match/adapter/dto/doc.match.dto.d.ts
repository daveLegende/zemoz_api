import { MatchType, MatchState, MatchScores } from 'src/match/domain';
import { MatchEvent } from 'src/matchEvents/domain';
import { Poule } from 'src/poule/domain';
import { Team } from 'src/team/domain';
import { OddsDTO } from './odds.dto';
export declare class MatchDocOutputDTO {
    id: string;
    lieu: string;
    type: MatchType;
    etat?: MatchState;
    journee?: number;
    date: Date;
    home: Team;
    away: Team;
    scores?: MatchScores;
    events?: MatchEvent[];
    poule?: Poule;
    isProlongation: boolean;
    teamQualify: string;
    odds?: OddsDTO;
}
