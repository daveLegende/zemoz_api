import { EventType } from "src/match/domain";

export class ICreateMatchEventDTO {
    match: string;
    type: EventType;
    equipe: string;
    joueur: string;
    minute: number;
}

export interface IUpdateMatchEventDTO extends Partial<ICreateMatchEventDTO> {
    id: string;
}
  