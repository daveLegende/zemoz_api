import { EventType, MatchState } from 'src/match/domain';
import { OddsDTO } from './odds.dto';
export declare class UpdateStateDto {
    id: string;
    etat: MatchState;
}
export declare class UpdateMatchScoreEventDto {
    id: string;
    teamId: string;
    playerId: string;
    minuite: number;
    eventType: EventType;
    homeScore: number;
    awayScore: number;
}
export declare class UpdateOddsStateDto {
    odds?: OddsDTO;
}
