import { ITimestamp } from "../../_shared/domain/interface";
import { Match } from "../../match/domain";
import { Account } from "../../account/domain/account.model";
import { PronoState } from "./pronos.enum";

export class Prononstic extends ITimestamp {
    id: string;
    account: Account;
    match: Match;
    homeScore: number;
    awayScore: number;
    date: Date;
    etat?: PronoState;
}