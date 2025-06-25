import { Team } from "src/team/domain";
import { ICreateMatchDTO, IUpdateMatchDTO } from "../app/dto";
import { Match } from "../domain";
import { Arbitre } from "src/arbitre/domain";
import { Poule } from "src/poule/domain";
import { UpdateMatchScoreEventDto, UpdateOddsStateDto, UpdateStateDto } from "./dto";
export declare abstract class MatchFactory {
    static create(data: ICreateMatchDTO, referees: Arbitre[], home: Team, away: Team, poule: Poule): Promise<Match>;
    static update(match: Match, data: IUpdateMatchDTO, referees: Arbitre[], home: Team, away: Team): Match;
    static updateScore(match: Match, data: UpdateMatchScoreEventDto): Match;
    static updateState(match: Match, data: UpdateStateDto): Match;
    static updateOdds(match: Match, data: UpdateOddsStateDto): Match;
    static getMatch(match: Match): Match;
}
