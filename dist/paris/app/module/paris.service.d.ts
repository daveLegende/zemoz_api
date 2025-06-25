import { Paris } from "src/paris/domain";
import { ICreateParisDTO, IUpdateParisDTO } from "../dto";
export declare abstract class IParisService {
    abstract add(data: ICreateParisDTO): Promise<Paris>;
    abstract fetchAll(): Promise<Paris[]>;
    abstract fetchOne(id: string): Promise<Paris>;
    abstract edit(data: IUpdateParisDTO): Promise<Paris>;
    abstract setState(id: string): Promise<boolean>;
    abstract search(data: Partial<Paris>): Promise<Paris>;
    abstract remove(id: string): Promise<boolean>;
    abstract getPendingParisForMatch(matchId: string): Promise<Paris[]>;
    abstract updateParisStatus(parisId: string, status: string, isWon: boolean): Promise<boolean>;
}
