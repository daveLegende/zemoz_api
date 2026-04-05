import { User } from "user/domain";
import { ITimestamp } from "../../_shared/domain/interface";
import { Player } from "player/domain";

export class MVP extends ITimestamp {
    id: string;
    user: User;
    player: Player;
    amount: number = 100;
}