import { Player } from "src/player/domain";
export interface ICreateTeamDTO {
    name: string;
    logo?: string;
    coach: string;
    commune: string;
    points?: number;
    matchJoues?: number;
    butMarques?: number;
    butConcedes?: number;
    joueurs: Player[];
}
export interface IUpdateTeamDTO extends Partial<ICreateTeamDTO> {
    id: string;
}
