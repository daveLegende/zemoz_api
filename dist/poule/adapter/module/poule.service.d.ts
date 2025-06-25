import { IPouleService } from 'src/poule/app/module';
import { IPouleRepository, Poule } from 'src/poule/domain';
import { PouleAccountDto, UpdatePouleDTO } from '../dto';
import { ITeamRepository } from 'src/team/domain';
export declare class PouleService implements IPouleService {
    private pouleRepository;
    private teamRepository;
    private readonly logger;
    constructor(pouleRepository: IPouleRepository, teamRepository: ITeamRepository);
    fetchAll(): Promise<Poule[]>;
    fetchOne(id: string): Promise<Poule>;
    search(data: Partial<Poule>): Promise<Poule>;
    add(data: PouleAccountDto): Promise<Poule>;
    edit(data: UpdatePouleDTO): Promise<Poule>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
