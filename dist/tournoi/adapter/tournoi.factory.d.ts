import { ICreateTournoiDTO, IUpdateTournoiDTO } from "../app/dto";
import { Tournoi } from '../domain';
export declare abstract class TournoiFactory {
    static create(data: ICreateTournoiDTO): Promise<Tournoi>;
    static update(tournoi: Tournoi, data: IUpdateTournoiDTO): Tournoi;
    static getTournoi(tournoi: Tournoi): Tournoi;
}
