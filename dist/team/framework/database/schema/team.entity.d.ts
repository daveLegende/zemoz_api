import { ATimestamp } from 'framework/timestamp.abstract';
import { Team } from 'src/team/domain';
import { PlayerEntity } from 'src/player/framework/database/schema/player.entity';
import { PouleEntity } from 'src/poule/framework/database/schema/poule.entity';
import { MatchEntity } from 'src/match/framework/database/schema/match.entity';
export declare class TeamEntity extends ATimestamp implements Team {
    id: string;
    name: string;
    coach: string;
    commune: string;
    points?: number;
    matchJoues?: number;
    butMarques?: number;
    butConcedes?: number;
    logo?: string;
    joueurs: PlayerEntity[];
    poule: PouleEntity;
    matchHome: MatchEntity[];
    matchAway: MatchEntity[];
}
