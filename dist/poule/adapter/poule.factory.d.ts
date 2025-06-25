import { Team } from "src/team/domain";
import { ICreatePouleDTO, IUpdatePouleDTO } from "../app/dto";
import { Poule } from "../domain";
export declare abstract class PouleFactory {
    static create(data: ICreatePouleDTO, teams: Team[]): Promise<Poule>;
    static update(poule: Poule, data: IUpdatePouleDTO): Poule;
    static getPoule(poule: Poule): Poule;
}
