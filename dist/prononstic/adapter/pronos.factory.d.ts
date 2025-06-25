import { Match } from "src/match/domain";
import { ICreatePronosDTO, IUpdatePronosDTO } from "../app/dto";
import { Prononstic } from '../domain';
import { User } from "user/domain";
export declare abstract class PrononsticFactory {
    static create(data: ICreatePronosDTO, user: User, match: Match): Promise<Prononstic>;
    static update(pronos: Prononstic, data: IUpdatePronosDTO): Prononstic;
    static getPronos(pronos: Prononstic): Prononstic;
}
