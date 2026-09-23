import { Account } from "../../account/domain/account.model";
import { ITimestamp } from "../../_shared/domain/interface";
import { Match } from "../../match/domain";
import { TeamPlayer } from "../../player/domain/team-player.model";

export class MVP extends ITimestamp {
    id: string;
    account: Account;
    match: Match;
    inscription: TeamPlayer;
    amount: number = 100;
}