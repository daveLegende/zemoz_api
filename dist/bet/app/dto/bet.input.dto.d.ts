import { CategoryName, OddsClass } from "src/bet/domain";
export interface ICreateBetDTO {
    category: CategoryName;
    odds: OddsClass;
    match: string;
}
export interface IUpdateBetDTO extends Partial<ICreateBetDTO> {
    id: string;
}
