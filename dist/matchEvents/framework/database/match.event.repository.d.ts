import { OnApplicationBootstrap } from '@nestjs/common';
import { IGenericRepository } from 'src/igeneric.interface';
import { Repository } from 'typeorm';
import { IMatchEventRepository, MatchEvent } from 'src/matchEvents/domain';
import { MatchEventEntity } from './schema/match.event.entity';
export declare class MatchEventRepository implements IMatchEventRepository, OnApplicationBootstrap {
    private eventRepository;
    events: IGenericRepository<MatchEvent>;
    constructor(eventRepository: Repository<MatchEventEntity>);
    save(events: MatchEvent): Promise<MatchEvent>;
    onApplicationBootstrap(): void;
}
