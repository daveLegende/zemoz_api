import { IDParamDTO } from 'adapter/dto';
import { IBetController, IBetService } from 'src/bet/app/module';
import { Bet } from 'src/bet/domain';
import { BetAccountDto, UpdateBetDTO } from '../dto';
export declare class BetController implements IBetController {
    private readonly betService;
    constructor(betService: IBetService);
    all(): Promise<Bet[]>;
    search(param: Bet): Promise<Bet>;
    show({ id }: IDParamDTO): Promise<Bet>;
    create(data: BetAccountDto): Promise<Bet>;
    update(data: UpdateBetDTO): Promise<Bet>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
