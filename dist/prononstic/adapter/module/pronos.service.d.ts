import { IPrononsticService } from 'src/prononstic/app/module';
import { IPronosRepository, Prononstic } from 'src/prononstic/domain';
import { PrononsticAccoutDTO, UpdatePrononsticDTO } from '../dto';
import { IUserRepository } from 'user/domain';
import { IMatchRepository } from 'src/match/domain';
export declare class PrononsticService implements IPrononsticService {
    private pronosRepository;
    private userRepository;
    private matchRepository;
    private readonly logger;
    constructor(pronosRepository: IPronosRepository, userRepository: IUserRepository, matchRepository: IMatchRepository);
    fetchAll(): Promise<Prononstic[]>;
    fetchOne(id: string): Promise<Prononstic>;
    search(data: Partial<Prononstic>): Promise<Prononstic>;
    add(data: PrononsticAccoutDTO): Promise<Prononstic>;
    edit(data: UpdatePrononsticDTO): Promise<Prononstic>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
