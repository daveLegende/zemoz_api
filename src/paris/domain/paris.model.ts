import { ITimestamp } from '../../_shared/domain/interface';
import { Match } from '../../match/domain';
import { User } from '../../user/domain';

// export class ParisCategories extends ITimestamp {
//     id: string;
//     name: CategoryName;
//     options: string[];
// }

// export class OddsClass {
//     // Pour les paris avec V1, V2 et X
//     V1?: number;
//     V2?: number;
//     X?: number;

//     // Pour les paris avec OUI et NON
//     OUI?: number;
//     NON?: number;

//     // Pour les autres paris, tu peux ajouter d'autres propriétés spécifiques si besoin.
// }

export class Paris extends ITimestamp {
  id: string;
  odd: number;
  type: 'V1' | 'X' | 'V2';
  state: 'Pending' | 'Lost' | 'Won';
  amount: number;
  potentialGain: number;
  match: Match;
  user: User;
  isWon: boolean;
  isPaid: boolean;
}
