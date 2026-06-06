export interface ICreatePouleDTO {
  name: string;

  equipes: string[];
}

export interface IUpdatePouleDTO extends Partial<ICreatePouleDTO> {
  id: string;
}
