import { ITimestamp } from 'domain/interface';
import { Team } from 'src/team/domain';

export class Tournoi extends ITimestamp {
  id: string;
  name: string;
  editionName?: string;
  edition?: number;
  annee?: Date;
  winner?: Team;
}
