import { ATimestamp } from 'framework/timestamp.abstract';
import { Match, MatchScores, MatchState, MatchType } from 'src/match/domain';
import { PouleEntity } from 'src/poule/framework/database/schema/poule.entity';
import { TeamEntity } from 'src/team/framework/database/schema/team.entity';
import { ArbitreEntity } from 'src/arbitre/framework/database/schema/arbitre.entity';
import { MatchEventEntity } from 'src/matchEvents/framework/database/schema/match.event.entity';
import { PrononsticEntity } from 'src/prononstic/framework/database/schema/prono.entity';
import { BetEntity } from 'src/bet/framework/schema/bet.entity';
import { ParisEntity } from 'src/paris/framework/schema/paris.entity';
export declare class MatchEntity extends ATimestamp implements Match {
    id: string;
    lieu: string;
    type: MatchType;
    etat?: MatchState;
    journee?: number;
    date: Date;
    home: TeamEntity;
    away: TeamEntity;
    scores?: MatchScores;
    events?: MatchEventEntity[];
    poule?: PouleEntity;
    arbitres: ArbitreEntity[];
    pronostics: PrononsticEntity[];
    bets?: BetEntity[];
    paris?: ParisEntity[];
    isProlongation?: boolean;
    teamQualify?: string;
    odds: {
        V1: number;
        X: number;
        V2: number;
    };
}
