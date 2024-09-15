import { Team } from "src/team/domain";
import { ICreateMatchDTO, IUpdateMatchDTO } from "../app/dto";
import { Match, MatchScores } from "../domain";
import { Arbitre } from "src/arbitre/domain";
import { Poule } from "src/poule/domain";
import {  UpdateMatchScoreEventDto, UpdateStateDto } from "./dto";

export abstract class MatchFactory {
  static async create(data: ICreateMatchDTO, referees: Arbitre[], home: Team, away: Team, poule: Poule): Promise<Match> {
    const match = new Match();
    
    match.type = data.type;
    match.lieu = data.lieu;
    match.date = data.date;
    match.etat = data.etat
    // 
    
    match.arbitres = referees;
    
    match.home = home;
    match.away = away;
    match.journee = data.journee;
    match.events = data.events;
    match.poule = poule;

    console.log(match.away);
    
    return match;
  }

  static update(match: Match, data: IUpdateMatchDTO, referees: Arbitre[], home: Team, away: Team): Match {

    match.type = data.type ?? match.type;
    match.lieu = data.lieu ?? match.lieu;
    match.etat = data.etat ?? match.etat;
    match.date = data.date ?? match.date;
    match.arbitres = referees ?? match.arbitres;
    match.away = away ?? match.away;
    match.home = home ?? match.home;
    match.journee = data.journee ?? match.journee;
    match.events = data.events ?? match.events;
    match.scores = /*data.scores ??*/ match.scores;
    match.poule = /*data.poule ??*/ match.poule;

    return match;
  }

  static updateScore(match: Match, data: UpdateMatchScoreEventDto): Match {
    // match.events = data.events ?? match.events;
    match.scores.home = data.homeScore ?? match.scores.home;
    match.scores.away = data.awayScore ?? match.scores.away;
    // match.poule = data.poule ?? match.poule;

    return match;
  }

  static updateState(match: Match, data: UpdateStateDto): Match {
    // match.scores.home = data.homeScore ?? match.scores.home;
    // match.scores.away = data.awayScore ?? match.scores.away;
    // match.poule = data.poule ?? match.poule;

    return match;
  }


  static getMatch(match: Match): Match {
    if (match) {
      return {
        id: match.id,
        type: match.type,
        lieu: match.lieu,
        etat: match.etat,
        journee: match.journee,
        date: match.date,
        arbitres: match.arbitres,
        away: match.away,
        home: match.home,
        scores: match.scores,
        events: match.events,
        bets: match.bets,
        poule: match.poule,
        createdAt: match.createdAt,
        updatedAt: match.updatedAt,
        deletedAt: match.deletedAt
      };
    }
  }
}
