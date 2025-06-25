/// <reference types="multer" />
import { IDParamDTO } from 'adapter/dto';
import { UpdateTeamDTO } from 'src/team/adapter/dto';
import { Team } from 'src/team/domain';
import { ITeamController, ITeamService } from 'src/team/app/module';
import { TeamAccoutDTO } from '../dto';
export declare class TeamController implements ITeamController {
    private readonly teamService;
    constructor(teamService: ITeamService);
    all(): Promise<Team[]>;
    search(param: TeamAccoutDTO): Promise<Team>;
    show({ id }: IDParamDTO): Promise<Team>;
    create(data: TeamAccoutDTO, file: Express.Multer.File): Promise<Team>;
    update(data: UpdateTeamDTO, file: Express.Multer.File): Promise<Team>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
