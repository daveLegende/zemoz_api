import { IGenericRepository } from "src/igeneric.interface";
import { Match } from "./match.model";
export declare abstract class IMatchRepository {
    abstract matchs: IGenericRepository<Match>;
    abstract save(match: Match): Promise<Match>;
}
