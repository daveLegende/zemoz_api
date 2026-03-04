import { ICreateMatchEventDTO, IUpdateMatchEventDTO } from "../dto";
import { MatchEvent } from "../../../matchEvents/domain";

export abstract class IMatchEventService {
  abstract add(data: ICreateMatchEventDTO): Promise<MatchEvent>;

  abstract fetchAll(): Promise<MatchEvent[]>;

  abstract fetchOne(id: string): Promise<MatchEvent>;

  abstract edit(data: IUpdateMatchEventDTO): Promise<MatchEvent>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<MatchEvent>): Promise<MatchEvent>;

  abstract remove(id: string): Promise<boolean>;

}
