import { IMatchRepository } from 'src/match/domain';
import { ITeamRepository } from 'src/team/domain';
import { IPlayerRepository } from 'src/player/domain';
import { MatchEventDTO, UpdateMatchEventDto } from 'src/matchEvents/adapter/dto';
import { IMatchEventRepository, MatchEvent } from 'src/matchEvents/domain';
import { IMatchEventService } from 'src/matchEvents/app/module';
export declare class MatchEventService implements IMatchEventService {
    private eventRepository;
    private teamRepository;
    private playerRepository;
    private matchRepository;
    private readonly logger;
    constructor(eventRepository: IMatchEventRepository, teamRepository: ITeamRepository, playerRepository: IPlayerRepository, matchRepository: IMatchRepository);
    fetchAll(): Promise<MatchEvent[]>;
    fetchOne(id: string): Promise<MatchEvent>;
    search(data: Partial<MatchEvent>): Promise<MatchEvent>;
    add(data: MatchEventDTO): Promise<MatchEvent>;
    edit(data: UpdateMatchEventDto): Promise<MatchEvent>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
