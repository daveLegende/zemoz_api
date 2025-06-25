import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { ITeamRepository, Team } from 'src/team/domain';
import { Repository } from 'typeorm';
import { TeamEntity } from './schema/team.entity';
export declare class TeamRepository implements ITeamRepository, OnApplicationBootstrap {
    private TeamRepository;
    teams: IGenericRepository<Team>;
    constructor(TeamRepository: Repository<TeamEntity>);
    onApplicationBootstrap(): void;
}
