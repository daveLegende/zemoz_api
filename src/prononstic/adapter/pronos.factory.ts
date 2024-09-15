import { Match } from "src/match/domain";
import { ICreatePronosDTO, IUpdatePronosDTO } from "../app/dto";
import { Prononstic } from '../domain'
import { User } from "user/domain";


export abstract class PrononsticFactory {
  static async create(data: ICreatePronosDTO, user: User, match: Match): Promise<Prononstic> {
    const prono = new Prononstic();
    prono.user = user;
    prono.match = match;
    prono.date = data.date;
    prono.homeScore = data.homeScore;
    prono.awayScore = data.awayScore;
    prono.etat = data.etat;
    
    return prono;
  }

  static update(pronos: Prononstic, data: IUpdatePronosDTO): Prononstic {

    pronos.etat = data.etat ?? pronos.etat;

    return pronos;
  }

  static getPronos(pronos: Prononstic): Prononstic {
    if (pronos) {
      return {
        id: pronos.id,
        user: pronos.user,
        match: pronos.match,
        date: pronos.date,
        homeScore: pronos.homeScore,
        awayScore: pronos.awayScore,
        etat: pronos.etat,
        createdAt: pronos.createdAt,
        updatedAt: pronos.updatedAt,
        deletedAt: pronos.deletedAt
      };
    }
  }
}
