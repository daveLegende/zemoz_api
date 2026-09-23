import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DBGenericRepository } from '../../../_shared/framework/database.repository';
import { IGenericRepository } from '../../../igeneric.interface';
import { ITeamPlayerRepository, TeamPlayer } from '../../domain';
import { TeamPlayerEntity } from './schema/team-player.entity';

@Injectable()
export class TeamPlayerRepository implements ITeamPlayerRepository, OnApplicationBootstrap {
    inscriptions: IGenericRepository<TeamPlayer>;

    constructor(
        @InjectRepository(TeamPlayerEntity)
        private teamPlayerRepository: Repository<TeamPlayerEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.inscriptions = new DBGenericRepository<TeamPlayerEntity>(this.teamPlayerRepository);
    }
}
