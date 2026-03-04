import { ITimestamp } from "../../_shared/domain/interface";
import { Match } from "../../match/domain";
import { Player } from "../../player/domain";
import { Team } from "../../team/domain";

// TypeScript
export class MatchEvent extends ITimestamp{
    id: string;
    match: Match;
    type: string;
    equipe: Team;
    joueur: Player;
    minute: number;
}