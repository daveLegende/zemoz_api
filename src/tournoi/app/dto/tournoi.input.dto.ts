
export interface ICreateTournoiDTO {
  name: string;

  editionName?: string;

  edition?: number;

  annee?: Date;

}

export interface IUpdateTournoiDTO extends Partial<ICreateTournoiDTO> {
  id: string;
}
