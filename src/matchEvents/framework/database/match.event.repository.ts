import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from '../../../_shared/framework/database.repository';
import { IGenericRepository } from '../../../igeneric.interface';
import { Repository } from 'typeorm';
import { IMatchEventRepository, MatchEvent } from '../../../matchEvents/domain';
import { MatchEventEntity } from './schema/match.event.entity';

@Injectable()
export class MatchEventRepository implements IMatchEventRepository, OnApplicationBootstrap {
    
    events: IGenericRepository<MatchEvent>;
    
    constructor(
        @InjectRepository(MatchEventEntity)
        private eventRepository: Repository<MatchEventEntity>,
    ) {}
    
    save(events: MatchEvent): Promise<MatchEvent> {
        throw new Error('Method not implemented.');
    }

    onApplicationBootstrap(): void {
        this.events = new DBGenericRepository<MatchEventEntity>(this.eventRepository);
    }
}
