import { IGenericRepository } from "src/igeneric.interface";
import { Info } from "./info.model";
export declare abstract class IInfoRepository {
    abstract infos: IGenericRepository<Info>;
}
