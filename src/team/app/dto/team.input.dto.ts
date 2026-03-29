import { Player } from "../../../player/domain";

export interface ICreateTeamDTO {
  name: string;

  logo?: string;

  coach?: string;

  commune?: string;

  points?: number;

  matchJoues?: number;

  butMarques?: number;

  butConcedes?: number;
  
  joueurs?: Player[];

  // poule?: string;

}

export interface IUpdateTeamDTO extends Partial<ICreateTeamDTO> {
  id: string;
}
