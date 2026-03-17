import { Match } from "../../match/domain";
import { Tournoi } from "../../tournoi/domain";
import { Bet, CategoryName } from "../domain";

export abstract class BetFactory {
    static create(data: {
      category: CategoryName;
      odds: Record<string, number>;
      match?: Match;
      competition?: Tournoi;
    }): Bet {
      const bet = new Bet();

      bet.category = data.category;
      bet.odds = data.odds;
      bet.match = data.match ?? null;
      bet.competition = data.competition ?? null;

      return bet;
    }

    static update(bet: Bet, odds: Record<string, number>): Bet {
      bet.odds = odds;
      return bet;
    }
    
    static getBet(bet: Bet): Bet {
      if (bet) {
        return {
          id: bet.id,
          category: bet.category,
          odds: bet.odds,
          match: bet.match,
          competition: bet.competition,
          couponBets: bet.couponBets,
          createdAt: bet.createdAt,
          updatedAt: bet.updatedAt,
          deletedAt: bet.deletedAt
        };
      }
    }
}