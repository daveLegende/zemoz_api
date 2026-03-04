import { IGenericRepository } from "../../igeneric.interface";
import { Team } from "./team.model";


export abstract class ITeamRepository {
    abstract teams: IGenericRepository<Team>;
}