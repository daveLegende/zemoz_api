import { Team } from "src/team/domain";
import { ICreateTeamDTO, IUpdateTeamDTO } from "../dto";
import { ICreatePlayerDTO } from "src/player/app/dto";


export abstract class ITeamService {
  abstract add(data: ICreateTeamDTO): Promise<Team>;

  abstract fetchAll(): Promise<Team[]>;

  abstract fetchOne(id: string): Promise<Team>;

  abstract edit(data: IUpdateTeamDTO): Promise<Team>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Team>): Promise<Team>;

  abstract remove(id: string): Promise<boolean>;
}
