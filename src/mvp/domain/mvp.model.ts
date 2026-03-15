import { User } from "user/domain";
import { ITimestamp } from "../../_shared/domain/interface";
import { Match } from "match/domain";
import { Player } from "player/domain";

export class MVP extends ITimestamp {
    id: string;
    user: User;
    match: Match;
    player: Player;
    amount: number = 100;
}