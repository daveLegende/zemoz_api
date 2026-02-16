import { OddsDto } from "src/bet/adapter/dto";
import { CategoryName, OddsClass } from "src/bet/domain";

export interface ICreateBetDTO {
    
  category: CategoryName;

  odds: OddsDto;

  match?: string;

  competitionId?: string;

}

export interface IUpdateBetDTO extends Partial<ICreateBetDTO> {
  id: string;
}
