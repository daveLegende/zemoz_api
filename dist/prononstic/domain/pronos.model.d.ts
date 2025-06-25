import { ITimestamp } from "domain/interface";
import { Match } from "src/match/domain";
import { User } from "user/domain";
import { PronoState } from "./pronos.enum";
export declare class Prononstic extends ITimestamp {
    id: string;
    user: User;
    match: Match;
    homeScore: number;
    awayScore: number;
    date: Date;
    etat?: PronoState;
}
