import { ICreateTeamDTO, IUpdateTeamDTO } from "../app/dto";
import { Team } from '../domain';
export declare abstract class TeamFactory {
    static create(data: ICreateTeamDTO): Promise<Team>;
    static update(team: Team, data: IUpdateTeamDTO): Team;
    static getFileLink(file: string): string;
    static getTeam(team: Team): Team;
}
