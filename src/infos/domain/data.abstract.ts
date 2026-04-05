import { IGenericRepository } from "../../igeneric.interface";
import { Info } from "./info.model";

export abstract class IInfoRepository {
    abstract infos: IGenericRepository<Info>;
}