import { IDParamDTO } from 'adapter/dto';
import { MatchEvent } from 'src/matchEvents/domain';
import { MatchEventDTO, UpdateMatchEventDto } from '../dto';
import { IMatchEventController, IMatchEventService } from 'src/matchEvents/app/module';
export declare class MatchEventController implements IMatchEventController {
    private readonly eventService;
    constructor(eventService: IMatchEventService);
    all(): Promise<MatchEvent[]>;
    search(param: MatchEvent): Promise<MatchEvent>;
    show({ id }: IDParamDTO): Promise<MatchEvent>;
    create(data: MatchEventDTO): Promise<MatchEvent>;
    update(data: UpdateMatchEventDto): Promise<MatchEvent>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
