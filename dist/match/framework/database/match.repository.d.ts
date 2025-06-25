import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { IMatchRepository, Match } from 'src/match/domain';
import { Repository } from 'typeorm';
import { MatchEntity } from './schema/match.entity';
export declare class MatchRepository implements IMatchRepository, OnApplicationBootstrap {
    private matchRepository;
    matchs: IGenericRepository<Match>;
    constructor(matchRepository: Repository<MatchEntity>);
    save(match: MatchEntity): Promise<MatchEntity>;
    onApplicationBootstrap(): void;
}
