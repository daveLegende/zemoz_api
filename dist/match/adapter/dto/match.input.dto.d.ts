import { MatchState, MatchType } from 'src/match/domain';
import { MatchEvent } from 'src/matchEvents/domain';
import { OddsDTO } from './odds.dto';
export declare class MatchAccoutDTO {
    lieu: string;
    type: MatchType;
    etat?: MatchState;
    journee?: number;
    date: Date;
    arbitres: string[];
    home: string;
    away: string;
    scores?: Record<string, any>;
    events?: MatchEvent[];
    poule?: string;
    isProlongation?: boolean;
    teamQualify?: string;
    odds?: OddsDTO;
}
declare const UpdateMatchDTO_base: import("@nestjs/common").Type<Partial<MatchAccoutDTO>>;
export declare class UpdateMatchDTO extends UpdateMatchDTO_base {
    id: string;
}
export {};
