import { IGenericRepository } from "src/igeneric.interface";
import { Tournoi } from "./tournoi.model";


export abstract class ITournoiRepository {
    abstract tournois: IGenericRepository<Tournoi>;
}