import { OddsDto } from "src/bet/import { IDParamDTO } from '../../../_shared/adapter/dto';";
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
