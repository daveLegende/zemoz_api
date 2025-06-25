import { IGenericRepository } from "src/igeneric.interface";
import { Poule } from "./poule.model";

export abstract class IPouleRepository {
    abstract poules: IGenericRepository<Poule>;
}