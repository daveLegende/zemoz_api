import { IGenericRepository } from "src/igeneric.interface";
import { Bet } from "./bet.model";

export abstract class IBetRepository {
    abstract bets: IGenericRepository<Bet>;
}