import { Match } from "src/match/domain";
import { ICreateBetDTO, IUpdateBetDTO } from "../app/dto";
import { Bet } from "../domain";

export abstract class BetFactory {
    static async create(data: ICreateBetDTO, match: Match, odds: Record<string, number>): Promise<Bet> {
        const bet = new Bet();

        bet.category = data.category;
        bet.odds = odds;
        bet.match = match;

        return bet;
    }

    static update(bet: Bet, data: IUpdateBetDTO): Bet {

      bet.category = data.category ?? bet.category;
      // bet.odds = data.odds ?? bet.odds;
      bet.match = bet.match;
  
      return bet;
    }
    
    static getBet(bet: Bet): Bet {
      if (bet) {
        return {
          id: bet.id,
          category: bet.category,
          odds: bet.odds,
          match: bet.match,
          couponBets: bet.couponBets,
          createdAt: bet.createdAt,
          updatedAt: bet.updatedAt,
          deletedAt: bet.deletedAt
        };
      }
    }
}