import { HalfPauseState, Match } from "../../../match/domain";
import { ICreateMatchDTO, IUpdateMatchDTO } from "../dto";
import { UpdateMatchPenaltyScoreDto, UpdateMatchPenaltyStateDto, UpdateMatchScoreEventDto, UpdateStateDto } from "../../../match/adapter/dto";
import { MatchEvent } from "../../../matchEvents/domain";

import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class IMatchService {
  abstract add(data: ICreateMatchDTO, tournoiId?: string): Promise<Match>;

  abstract fetchAll(query?: PaginationQuery, tournoiId?: string): Promise<PaginatedResult<Match>>;
  
  abstract fetchMatchEvents(id: string, tournoiId?: string): Promise<MatchEvent[]>;

  abstract fetchOne(id: string, tournoiId?: string): Promise<Match>;

  abstract edit(data: IUpdateMatchDTO, tournoiId?: string): Promise<Match>;

  abstract setState(id: string, tournoiId?: string): Promise<boolean>;

  abstract search(data: Partial<Match>, tournoiId?: string): Promise<Match>;

  abstract remove(id: string, tournoiId?: string): Promise<boolean>;

  abstract updateScore(data: UpdateMatchScoreEventDto, tournoiId?: string): Promise<Match>;

  abstract updateState(data: UpdateStateDto, tournoiId?: string): Promise<Match>;

  abstract updatePenaltyScores(data: UpdateMatchPenaltyScoreDto, tournoiId?: string): Promise<Match>;

  abstract updateTirAuxButsStatus(data: UpdateMatchPenaltyStateDto, tournoiId?: string): Promise<Match>;

  abstract updateHalfTimeState(id: string, halfPauseState: HalfPauseState, tournoiId?: string): Promise<Match>;

  // abstract uploadLogo(id: string, file: Express.Multer.File): Promise<Match>;
}
