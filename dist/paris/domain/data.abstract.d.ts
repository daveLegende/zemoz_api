import { IGenericRepository } from "src/igeneric.interface";
import { Paris } from "./paris.model";
export declare abstract class IParisRepository {
    abstract paris: IGenericRepository<Paris>;
}
