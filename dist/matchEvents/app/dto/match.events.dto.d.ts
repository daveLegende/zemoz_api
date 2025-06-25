import { EventType } from "src/match/domain";
export declare class ICreateMatchEventDTO {
    match: string;
    type: EventType;
    equipe: string;
    joueur: string;
    minute: number;
}
export interface IUpdateMatchEventDTO extends Partial<ICreateMatchEventDTO> {
    id: string;
}
