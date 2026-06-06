import { IIDParamDTO } from '../../../_shared/app/dto';
import { Match } from '../../../match/domain';
import { ICreateMatchDTO, IUpdateMatchDTO } from '../dto';
import { MatchEvent } from '../../../matchEvents/domain';

export abstract class IMatchController {
  abstract all(): Promise<Match[]>;

  abstract fetchMatchEvents(id: IIDParamDTO): Promise<MatchEvent[]>;

  abstract show(param: IIDParamDTO): Promise<Match>;

  abstract create(data: ICreateMatchDTO, file?: any): Promise<Match>;

  abstract search(data: Partial<Match>, file?: any): Promise<Match>;

  abstract update(data: IUpdateMatchDTO, file?: any): Promise<Match>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  // abstract uploadLogo(id: string, file: Express.Multer.File): Promise<Match>;
}
