import { IGenericRepository } from "src/igeneric.interface";
import { Arbitre } from "./arbitre.model";
export declare abstract class IArbitreRepository {
    abstract arbitres: IGenericRepository<Arbitre>;
}
