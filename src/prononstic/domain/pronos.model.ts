import { ITimestamp } from '../../_shared/domain/interface';
import { Match } from '../../match/domain';
import { User } from '../../user/domain';
import { PronoState } from './pronos.enum';

export class Prononstic extends ITimestamp {
  id: string;
  user: User;
  match: Match;
  homeScore: number;
  awayScore: number;
  date: Date;
  etat?: PronoState;
}
