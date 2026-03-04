import { Team } from "../../team/domain";
import { Arbitre } from "../../arbitre/domain";
import { MatchEvent } from "../domain";
import { ICreateMatchEventDTO, IUpdateMatchEventDTO } from "../app/dto";
import { Player } from "../../player/domain";
import { Match } from "../../match/domain";

export abstract class MatchEventFactory {
  static async create(data: ICreateMatchEventDTO, equipe: Team, joueur: Player, match: Match): Promise<MatchEvent> {
    const events = new MatchEvent();
    
    events.match = match;
    events.type = data.type;
    events.equipe = equipe;
    events.joueur = joueur;
    events.minute = data.minute;
    
    return events;
  }

  static update(events: MatchEvent, data: IUpdateMatchEventDTO, equipe: Team, joueur: Player): MatchEvent {

    events.type = data.type ?? events.type;
    events.equipe = equipe ?? events.equipe;
    events.joueur = joueur ?? events.joueur;
    events.minute = data.minute ?? events.minute;

    return events;
  }


  static getMatch(events: MatchEvent): MatchEvent {
    if (events) {
      return {
        id: events.id,
        match: events.match,
        type: events.type,
        equipe: events.equipe,
        joueur: events.joueur,
        minute: events.minute,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
        deletedAt: events.deletedAt
      };
    }
  }
}
