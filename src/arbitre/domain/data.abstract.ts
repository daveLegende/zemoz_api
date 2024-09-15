import { IGenericRepository } from "src/igeneric.interface";
import { Arbitre } from "./arbitre.model";

export abstract class IArbitreRepository {
    abstract arbitres: IGenericRepository<Arbitre>;
}