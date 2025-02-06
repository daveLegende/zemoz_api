import { ITimestamp } from 'domain/interface';

export class Tournoi extends ITimestamp {
  id: string;
  name: string;
  editionName?: string;
  edition?: number;
  annee?: Date;
}
