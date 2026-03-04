import { ITimestamp } from '../../_shared/domain/interface';
import { Team } from '../../team/domain';

export class Tournoi extends ITimestamp {
  id: string;
  name: string;
  editionName?: string;
  edition?: number;
  annee?: Date;
  winner?: Team;
}
