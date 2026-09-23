export interface ICreatePlayerDTO {
  name: string;

  age?: number;

  phone?: string;
  
  avatar?: string;

  team: string;

  numeroMaillot?: number;

  poste?: string;

  statut?: string;
}

export interface IUpdatePlayerDTO extends Partial<ICreatePlayerDTO> {
  id: string;
}

export interface ICreateTeamPlayerDTO {
  playerId?: string;
  teamId: string;
  numeroMaillot?: number;
  poste?: string;
  statut?: string;
}

export interface IUpdateTeamPlayerDTO extends Partial<ICreateTeamPlayerDTO> {
  id: string;
}
