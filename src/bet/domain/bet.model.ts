import { ITimestamp } from "../../_shared/domain/interface";
import { Match } from "../../match/domain";
import { CategoryName } from "./bet.enum";
import { CouponBet } from "../../couponBet/domain";


export class BetCategories extends ITimestamp {
    id: string;
    name: CategoryName;
    options: string[];
}

export class OddsClass {
    // Pour les paris avec V1, V2 et X
    V1?: number;
    V2?: number;
    X?: number;

    // Pour les paris avec OUI et NON
    OUI?: number;
    NON?: number;

    // Pour les autres paris, tu peux ajouter d'autres propriétés spécifiques si besoin.
}

export class Bet extends ITimestamp {
    id: string;
    category: CategoryName;
    odds: Record<string, number>;
    match?: Match;
    // competition?: Tournoi;
    competitionId?: string;
    couponBets: CouponBet[];
}
