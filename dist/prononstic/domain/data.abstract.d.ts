import { IGenericRepository } from "src/igeneric.interface";
import { Prononstic } from "./pronos.model";
export declare abstract class IPronosRepository {
    abstract pronos: IGenericRepository<Prononstic>;
}
