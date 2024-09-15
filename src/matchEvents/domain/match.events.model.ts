import { ITimestamp } from "domain/interface";
import { Match } from "src/match/domain";
import { Player } from "src/player/domain";
import { Team } from "src/team/domain";

// TypeScript
export class MatchEvent extends ITimestamp{
    id: string;
    match: Match;
    type: string;
    equipe: Team;
    joueur: Player;
    minute: number;
}