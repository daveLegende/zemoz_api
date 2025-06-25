import { IMatchRepository } from 'src/match/domain';
import { IParisService } from 'src/paris/app/module';
import { Paris } from 'src/paris/domain';
import { IParisRepository } from 'src/paris/domain/data.abstract';
import { ParisAccountDto, UpdateParisDTO } from '../dto';
import { IUserRepository } from 'user/domain';
export declare class ParisService implements IParisService {
    private parisRepository;
    private userRepository;
    private matchRepository;
    private readonly logger;
    constructor(parisRepository: IParisRepository, userRepository: IUserRepository, matchRepository: IMatchRepository);
    fetchAll(): Promise<Paris[]>;
    fetchOne(id: string): Promise<Paris>;
    search(data: Partial<Paris>): Promise<Paris>;
    add(data: ParisAccountDto): Promise<Paris>;
    edit(data: UpdateParisDTO): Promise<Paris>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
    getPendingParisForMatch(id: string): Promise<Paris[]>;
    updateParisStatus(id: string): Promise<boolean>;
}
