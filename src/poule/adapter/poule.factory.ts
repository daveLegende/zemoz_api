import { Team } from '../../team/domain';
import { ICreatePouleDTO, IUpdatePouleDTO } from '../app/dto';
import { Poule } from '../domain';

export abstract class PouleFactory {
  static async create(data: ICreatePouleDTO, teams: Team[]): Promise<Poule> {
    const poule = new Poule();

    poule.name = data.name;
    poule.equipes = teams;

    return poule;
  }

  static update(poule: Poule, data: IUpdatePouleDTO): Poule {
    poule.name = data.name ?? Poule.name;
    poule.equipes = /*data.equipes ??*/ poule.equipes;

    return poule;
  }

  static getPoule(poule: Poule): Poule {
    if (poule) {
      return {
        id: poule.id,
        name: poule.name,
        equipes: poule.equipes,
        createdAt: poule.createdAt,
        updatedAt: poule.updatedAt,
        deletedAt: poule.deletedAt,
      };
    }
  }
}
