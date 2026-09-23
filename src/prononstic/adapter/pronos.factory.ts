import { Match } from "../../match/domain";
import { ICreatePronosDTO, IUpdatePronosDTO } from "../app/dto";
import { Prononstic } from '../domain';
import { Account } from "../../account/domain/account.model";

export abstract class PrononsticFactory {
  static async create(data: ICreatePronosDTO, account: Account, match: Match): Promise<Prononstic> {
    const prono = new Prononstic();
    prono.account = account;
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
        account: pronos.account,
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
