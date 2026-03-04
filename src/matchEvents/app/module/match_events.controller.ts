import { IIDParamDTO } from '../../../_shared/app/dto';
import { ICreateMatchEventDTO, IUpdateMatchEventDTO } from '../dto';
import { MatchEvent } from '../../../matchEvents/domain';

export abstract class IMatchEventController {
  abstract all(): Promise<MatchEvent[]>;

  abstract show(param: IIDParamDTO): Promise<MatchEvent>;

  abstract create(data: ICreateMatchEventDTO, file?: any): Promise<MatchEvent>;

  abstract search(data: Partial<MatchEvent>, file?: any): Promise<MatchEvent>;

  abstract update(data: IUpdateMatchEventDTO, file?: any): Promise<MatchEvent>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;
}
