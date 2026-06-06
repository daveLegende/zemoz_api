import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from '../../../_shared/framework/database.repository';
import { IGenericRepository } from '../../../igeneric.interface';
import { ITeamRepository, Team } from '../../domain';
import { Repository } from 'typeorm';
import { TeamEntity } from './schema/team.entity';

@Injectable()
export class TeamRepository implements ITeamRepository, OnApplicationBootstrap {
  teams: IGenericRepository<Team>;

  constructor(
    @InjectRepository(TeamEntity)
    private TeamRepository: Repository<TeamEntity>,
  ) {}

  onApplicationBootstrap(): void {
    this.teams = new DBGenericRepository<TeamEntity>(this.TeamRepository);
  }
}
