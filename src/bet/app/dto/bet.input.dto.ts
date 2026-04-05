import { OddsDto } from "../../../bet/adapter/dto";
import { CategoryName, OddsClass } from "../../../bet/domain";

export interface ICreateBetDTO {
    
  category: CategoryName;

  odds: OddsDto;

  match?: string;

  competitionId?: string;

}

export interface IUpdateBetDTO extends Partial<ICreateBetDTO> {
  id: string;
}


export interface ICreateMultipleBetsDto {
  matchId?: string;

  competitionId?: string;
  
  bets: ICreateBetDTO[];
}

export interface IUpdateBetDTO extends Partial<ICreateBetDTO> {
  id: string;
}

