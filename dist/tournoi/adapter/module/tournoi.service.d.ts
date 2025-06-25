import { ITournoiService } from 'src/tournoi/app/module';
import { ITournoiRepository, Tournoi } from 'src/tournoi/domain';
import { TournoiAccoutDTO, UpdateTournoiDTO } from '../dto';
export declare class TournoiService implements ITournoiService {
    private tournoiRepository;
    private readonly logger;
    constructor(tournoiRepository: ITournoiRepository);
    fetchAll(): Promise<Tournoi[]>;
    fetchOne(id: string): Promise<Tournoi>;
    search(data: Partial<Tournoi>): Promise<Tournoi>;
    add(data: TournoiAccoutDTO): Promise<Tournoi>;
    edit(data: UpdateTournoiDTO): Promise<Tournoi>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
