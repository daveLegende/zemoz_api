import { Match } from "src/match/domain";
import { ICreateMatchDTO, IUpdateMatchDTO } from "../dto";
import { UpdateMatchScoreEventDto, UpdateStateDto } from "src/match/adapter/dto";
export declare abstract class IMatchService {
    abstract add(data: ICreateMatchDTO): Promise<Match>;
    abstract fetchAll(): Promise<Match[]>;
    abstract fetchOne(id: string): Promise<Match>;
    abstract edit(data: IUpdateMatchDTO): Promise<Match>;
    abstract setState(id: string): Promise<boolean>;
    abstract search(data: Partial<Match>): Promise<Match>;
    abstract remove(id: string): Promise<boolean>;
    abstract updateScore(data: UpdateMatchScoreEventDto): Promise<Match>;
    abstract updateState(data: UpdateStateDto): Promise<Match>;
}
