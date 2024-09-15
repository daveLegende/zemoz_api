import { IGenericRepository } from "src/igeneric.interface";
import { Info } from "./info.model";

export abstract class IInfoRepository {
    abstract infos: IGenericRepository<Info>;
}