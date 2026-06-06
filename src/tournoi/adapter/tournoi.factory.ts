import { ICreateTournoiDTO, IUpdateTournoiDTO } from '../app/dto';
import { Tournoi } from '../domain';

export abstract class TournoiFactory {
  static async create(data: ICreateTournoiDTO): Promise<Tournoi> {
    const tournoi = new Tournoi();
    tournoi.name = data.name;
    tournoi.editionName = data.editionName;
    tournoi.edition = data.edition;
    tournoi.annee = data.annee;

    return tournoi;
  }

  static update(tournoi: Tournoi, data: IUpdateTournoiDTO): Tournoi {
    tournoi.name = data.name ?? tournoi.name;
    tournoi.editionName = data.editionName ?? tournoi.editionName;
    tournoi.edition = data.edition ?? tournoi.edition;
    tournoi.annee = data.annee ?? tournoi.annee;

    return tournoi;
  }

  static getTournoi(tournoi: Tournoi): Tournoi {
    if (tournoi) {
      return {
        id: tournoi.id,
        name: tournoi.name,
        editionName: tournoi.editionName,
        edition: tournoi.edition,
        createdAt: tournoi.createdAt,
        updatedAt: tournoi.updatedAt,
        deletedAt: tournoi.deletedAt,
      };
    }
  }
}
