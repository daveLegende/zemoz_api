import { Match } from "src/match/domain";
import { ICreateBetDTO, IUpdateBetDTO } from "../app/dto";
import { Bet } from "../domain";
export declare abstract class BetFactory {
    static create(data: ICreateBetDTO, match: Match, odds: Record<string, number>): Promise<Bet>;
    static update(bet: Bet, data: IUpdateBetDTO): Bet;
    static getBet(bet: Bet): Bet;
}
