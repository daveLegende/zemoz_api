import { IBetService } from 'src/bet/app/module';
import { Bet } from 'src/bet/domain';
import { BetAccountDto, UpdateBetDTO } from '../dto';
import { IBetRepository } from 'src/bet/domain/data.abstract';
import { IMatchRepository } from 'src/match/domain';
export declare class BetService implements IBetService {
    private betsRepository;
    private matchRepository;
    private readonly logger;
    constructor(betsRepository: IBetRepository, matchRepository: IMatchRepository);
    fetchAll(): Promise<Bet[]>;
    fetchOne(id: string): Promise<Bet>;
    search(data: Partial<Bet>): Promise<Bet>;
    add(data: BetAccountDto): Promise<Bet>;
    edit(data: UpdateBetDTO): Promise<Bet>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
