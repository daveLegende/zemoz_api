import { IGenericRepository } from "src/igeneric.interface";
import { Tournoi } from "./tournoi.model";
export declare abstract class ITournoiRepository {
    abstract tournois: IGenericRepository<Tournoi>;
}
