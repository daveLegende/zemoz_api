export interface ICreatePlayerDTO {
  firstname: string;

  lastname: string;

  age?: number;

  phone: string;
  
  avatar?: string;

  buts?: number;

  passes?: number;

  team: string;

}

export interface IUpdatePlayerDTO extends Partial<ICreatePlayerDTO> {
  id: string;
}
