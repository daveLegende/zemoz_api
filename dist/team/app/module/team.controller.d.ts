import { IIDParamDTO } from 'app/dto';
import { Team } from 'src/team/domain';
import { ICreateTeamDTO, IUpdateTeamDTO } from '../dto';
export declare abstract class ITeamController {
    abstract all(): Promise<Team[]>;
    abstract show(param: IIDParamDTO): Promise<Team>;
    abstract create(data: ICreateTeamDTO, file?: any): Promise<Team>;
    abstract search(data: Partial<Team>, file?: any): Promise<Team>;
    abstract update(data: IUpdateTeamDTO, file?: any): Promise<Team>;
    abstract setState(param: IIDParamDTO): Promise<boolean>;
    abstract remove(param: IIDParamDTO): Promise<boolean>;
}
