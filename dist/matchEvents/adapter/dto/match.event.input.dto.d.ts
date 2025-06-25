import { EventType } from "src/match/domain";
export declare class MatchEventDTO {
    match: string;
    type: EventType;
    equipe: string;
    joueur: string;
    minute: number;
}
export declare class UpdateMatchEventDto extends MatchEventDTO {
    id: string;
}
