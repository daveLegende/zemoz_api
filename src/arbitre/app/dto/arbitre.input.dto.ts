import { RoleArbitre } from "../../domain";


export interface ICreateArbitreDTO {
    
  name: string;

  avatar: string;

  phone: string;
  
  role?: RoleArbitre;

}

export interface IUpdateArbitreDTO extends Partial<ICreateArbitreDTO> {
  id: string;
}
