import { IDParamDTO } from 'adapter/dto';
import { IMatchController, IMatchService } from 'src/match/app/module';
import { Match } from 'src/match/domain';
import { MatchAccoutDTO, UpdateMatchDTO } from '../dto';
export declare class MatchController implements IMatchController {
    private readonly matchService;
    constructor(matchService: IMatchService);
    all(): Promise<Match[]>;
    search(param: Match): Promise<Match>;
    show({ id }: IDParamDTO): Promise<Match>;
    create(data: MatchAccoutDTO): Promise<Match>;
    update(data: UpdateMatchDTO): Promise<Match>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
