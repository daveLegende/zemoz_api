import { MatchEntity } from "src/match/framework/database/schema/match.entity";
import { MatchEvent } from "src/matchEvents/domain";
import { PlayerEntity } from "src/player/framework/database/schema/player.entity";
import { TeamEntity } from "src/team/framework/database/schema/team.entity";
export declare class MatchEventEntity extends MatchEvent {
    id: string;
    type: string;
    equipe: TeamEntity;
    joueur: PlayerEntity;
    minute: number;
    match: MatchEntity;
}
