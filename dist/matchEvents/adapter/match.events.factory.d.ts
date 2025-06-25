import { Team } from "src/team/domain";
import { MatchEvent } from "../domain";
import { ICreateMatchEventDTO, IUpdateMatchEventDTO } from "../app/dto";
import { Player } from "src/player/domain";
import { Match } from "src/match/domain";
export declare abstract class MatchEventFactory {
    static create(data: ICreateMatchEventDTO, equipe: Team, joueur: Player, match: Match): Promise<MatchEvent>;
    static update(events: MatchEvent, data: IUpdateMatchEventDTO, equipe: Team, joueur: Player): MatchEvent;
    static getMatch(events: MatchEvent): MatchEvent;
}
