import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from 'framework/database.repository';
import { IGenericRepository } from 'src/igeneric.interface';
import { IMatchRepository, Match } from 'src/match/domain';
import { Repository } from 'typeorm';
import { MatchEntity } from './schema/match.entity';

@Injectable()
export class MatchRepository implements IMatchRepository, OnApplicationBootstrap {
    matchs: IGenericRepository<Match>;

    constructor(
        @InjectRepository(MatchEntity)
        private matchRepository: Repository<MatchEntity>,
    ) { }

    async save(match: MatchEntity): Promise<MatchEntity> {
        return await this.matchRepository.save(match);
    }

    onApplicationBootstrap(): void {
        this.matchs = new DBGenericRepository<MatchEntity>(this.matchRepository);
    }
}
