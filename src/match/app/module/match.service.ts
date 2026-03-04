import { HalfPauseState, Match } from "src/match/domain";
import { ICreateMatchDTO, IUpdateMatchDTO } from "../dto";
import { UpdateMatchPenaltyScoreDto, UpdateMatchPenaltyStateDto, UpdateMatchScoreEventDto, UpdateStateDto } from "src/match/import { IDParamDTO } from '../../../_shared/adapter/dto';";

export abstract class IMatchService {
  abstract add(data: ICreateMatchDTO): Promise<Match>;

  abstract fetchAll(): Promise<Match[]>;

  abstract fetchOne(id: string): Promise<Match>;

  abstract edit(data: IUpdateMatchDTO): Promise<Match>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Match>): Promise<Match>;

  abstract remove(id: string): Promise<boolean>;

  abstract updateScore(data: UpdateMatchScoreEventDto): Promise<Match>;

  abstract updateState(data: UpdateStateDto): Promise<Match>;

  abstract updatePenaltyScores(data: UpdateMatchPenaltyScoreDto): Promise<Match>;

  abstract updateTirAuxButsStatus(data: UpdateMatchPenaltyStateDto): Promise<Match>;

  abstract updateHalfTimeState(id: string, halfPauseState: HalfPauseState): Promise<Match>;

  // abstract uploadLogo(id: string, file: Express.Multer.File): Promise<Match>;
}
