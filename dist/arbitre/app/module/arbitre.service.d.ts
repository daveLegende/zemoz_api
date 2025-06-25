import { Arbitre } from "src/arbitre/domain";
import { ICreateArbitreDTO, IUpdateArbitreDTO } from "../dto";
export declare abstract class IArbitreService {
    abstract add(data: ICreateArbitreDTO): Promise<Arbitre>;
    abstract fetchAll(): Promise<Arbitre[]>;
    abstract fetchOne(id: string): Promise<Arbitre>;
    abstract edit(data: IUpdateArbitreDTO): Promise<Arbitre>;
    abstract setState(id: string): Promise<boolean>;
    abstract search(data: Partial<Arbitre>): Promise<Arbitre>;
    abstract remove(id: string): Promise<boolean>;
}
