import { ITeamService } from 'src/team/app/module';
import { ITeamRepository, Team } from 'src/team/domain';
import { TeamAccoutDTO, UpdateTeamDTO } from '../dto';
import { IPlayerRepository } from 'src/player/domain';
export declare class TeamService implements ITeamService {
    private teamRepository;
    private playerRepository;
    private readonly logger;
    constructor(teamRepository: ITeamRepository, playerRepository: IPlayerRepository);
    fetchAll(): Promise<Team[]>;
    fetchOne(id: string): Promise<Team>;
    search(data: Partial<Team>): Promise<Team>;
    add(data: TeamAccoutDTO): Promise<Team>;
    edit(data: UpdateTeamDTO): Promise<Team>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
