export interface ICreateInfoDTO {
    
  image: string;

  title: string;
  
  desc: string;

}

export interface IUpdateInfoDTO extends Partial<ICreateInfoDTO> {
  id: string;
}
