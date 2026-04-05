import { Team } from "../../team/domain";
import { ICreateMatchDTO, IUpdateMatchDTO } from "../app/dto";
import { Match, MatchScores } from "../domain";
import { Arbitre } from "../../arbitre/domain";
import { Poule } from "../../poule/domain";
import {  UpdateMatchPenaltyScoreDto, UpdateMatchPenaltyStateDto, UpdateMatchScoreEventDto, UpdateOddsStateDto, UpdateStateDto } from "./dto";

export abstract class MatchFactory {
  static async create(data: ICreateMatchDTO, referees: Arbitre[], home: Team, away: Team, poule: Poule): Promise<Match> {
    const match = new Match();
    
    match.type = data.type;
    match.lieu = data.lieu;
    match.date = data.date;
    match.etat = data.etat;
    match.isProlongation = data.isProlongation;
    match.teamQualify = data.teamQualify;
    // 
    
    match.arbitres = referees;
    
    match.home = home;
    match.away = away;
    match.journee = data.journee;
    match.events = data.events;
    match.poule = poule;

    // Ajoutez les odds si ils existent dans le DTO
    if (data.odds) {
      match.odds = {
        V1: data.odds.V1,
        X: data.odds.X,
        V2: data.odds.V2,
      };
    }

    console.log(match.away);
    
    return match;
  }

  static update(match: Match, data: IUpdateMatchDTO, referees: Arbitre[], home: Team, away: Team): Match {

    match.type = data.type ?? match.type;
    match.lieu = data.lieu ?? match.lieu;
    // match.etat = data.etat ?? match.etat;
    match.date = data.date ?? match.date;
    match.arbitres = referees ?? match.arbitres;
    match.away = away ?? match.away;
    match.home = home ?? match.home;
    match.journee = data.journee ?? match.journee;
    match.isProlongation = data.isProlongation ?? match.isProlongation;
    match.isTirAuxButs = data.isTirAuxButs ?? match.isTirAuxButs;
    match.homePenalty = data.homePenalty ?? match.homePenalty;
    match.awayPenalty = data.awayPenalty ?? match.awayPenalty;
    match.teamQualify = data.teamQualify ?? match.teamQualify;
    match.events = data.events ?? match.events;
    match.scores = /*data.scores ??*/ match.scores;
    match.poule = /*data.poule ??*/ match.poule;
    match.odds = data.odds ?? match.odds;

    return match;
  }

  static updateScore(match: Match, data: UpdateMatchScoreEventDto): Match {
    // match.events = data.events ?? match.events;
    match.scores.home = data.homeScore ?? match.scores.home;
    match.scores.away = data.awayScore ?? match.scores.away;
    // match.poule = data.poule ?? match.poule;

    return match;
  }

  static updatePenaltyScore(match: Match, data: UpdateMatchPenaltyScoreDto): Match {
    // match.events = data.events ?? match.events;
    match.homePenalty = data.homePenalty ?? match.homePenalty;
    match.awayPenalty = data.awayPenalty ?? match.awayPenalty;
    // match.poule = data.poule ?? match.poule;

    return match;
  }

  static updatePenaltyState(match: Match, data: UpdateMatchPenaltyStateDto): Match {
    // match.events = data.events ?? match.events;
    match.isTirAuxButs = true;
    // match.poule = data.poule ?? match.poule;

    return match;
  }

  static updateState(match: Match, data: UpdateStateDto): Match {
    // match.scores.home = data.homeScore ?? match.scores.home;
    // match.scores.away = data.awayScore ?? match.scores.away;
    // match.poule = data.poule ?? match.poule;

    return match;
  }


  static updateOdds(match: Match, data: UpdateOddsStateDto): Match {
    match.odds = data.odds ?? match.odds;

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
        isProlongation: match.isProlongation,
        isTirAuxButs: match.isTirAuxButs,
        homePenalty: match.homePenalty,
        awayPenalty: match.awayPenalty,
        teamQualify: match.teamQualify,
        odds: match.odds,
        createdAt: match.createdAt,
        updatedAt: match.updatedAt,
        deletedAt: match.deletedAt
      };
    }
  }
}
