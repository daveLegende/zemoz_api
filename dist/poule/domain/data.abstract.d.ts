import { IGenericRepository } from "src/igeneric.interface";
import { Poule } from "./poule.model";
export declare abstract class IPouleRepository {
    abstract poules: IGenericRepository<Poule>;
}
