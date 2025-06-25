import { IDParamDTO } from 'adapter/dto';
import { UpdateTournoiDTO } from 'src/tournoi/adapter/dto';
import { Tournoi } from 'src/tournoi/domain';
import { ITournoiController, ITournoiService } from 'src/tournoi/app/module';
import { TournoiAccoutDTO } from '../dto';
export declare class TournoiController implements ITournoiController {
    private readonly tournoiService;
    constructor(tournoiService: ITournoiService);
    all(): Promise<Tournoi[]>;
    search(param: TournoiAccoutDTO): Promise<Tournoi>;
    show({ id }: IDParamDTO): Promise<Tournoi>;
    create(data: TournoiAccoutDTO): Promise<Tournoi>;
    update(data: UpdateTournoiDTO): Promise<Tournoi>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
