import { IIDParamDTO } from 'app/dto';
import { Tournoi } from 'src/tournoi/domain';
import { ICreateTournoiDTO, IUpdateTournoiDTO } from '../dto';
export declare abstract class ITournoiController {
    abstract all(): Promise<Tournoi[]>;
    abstract show(param: IIDParamDTO): Promise<Tournoi>;
    abstract create(data: ICreateTournoiDTO, file?: any): Promise<Tournoi>;
    abstract search(data: Partial<Tournoi>, file?: any): Promise<Tournoi>;
    abstract update(data: IUpdateTournoiDTO, file?: any): Promise<Tournoi>;
    abstract setState(param: IIDParamDTO): Promise<boolean>;
    abstract remove(param: IIDParamDTO): Promise<boolean>;
}
