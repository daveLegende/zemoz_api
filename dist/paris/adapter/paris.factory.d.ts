import { Match } from "src/match/domain";
import { ICreateParisDTO, IUpdateParisDTO } from "../app/dto";
import { Paris } from "../domain";
import { User } from "user/domain";
export declare abstract class ParisFactory {
    static create(data: ICreateParisDTO, match: Match, user: User): Promise<Paris>;
    static update(paris: Paris, data: IUpdateParisDTO, match: Match, user: User): Paris;
    static getParis(paris: Paris): Paris;
}
