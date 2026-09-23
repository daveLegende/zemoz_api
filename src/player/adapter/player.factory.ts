import { ICreatePlayerDTO, IUpdatePlayerDTO } from "../app/dto";
import { Player } from '../domain'


export abstract class PlayerFactory {
  static async create(data: ICreatePlayerDTO): Promise<Player> {
    const player = new Player();
    player.age = data.age;
    player.phone = data.phone;
    player.name = data.name;
    player.avatar = data.avatar;

    return player;
  }

  static update(player: Player, data: IUpdatePlayerDTO): Player {
    player.age = data.age ?? player.age;
    player.phone = data.phone ?? player.phone;
    player.name = data.name ?? player.name;
    player.avatar = data.avatar ?? player.avatar;

    return player;
  }

  static getFileLink(file: string): string {
    if (file) {
      return `${process.env.APP_BASE_URL}/files/${file}`;
    }
  }

  static getPlayer(player: Player, withInscriptions = true): Player {
    if (player) {
      return {
        id: player.id,
        name: player.name,
        age: player.age,
        phone: player.phone,
        avatar: player.avatar,
        inscriptions: withInscriptions
          ? player.inscriptions?.map((inscription) => ({
              id: inscription.id,
              numeroMaillot: inscription.numeroMaillot,
              poste: inscription.poste,
              buts: inscription.buts,
              passes: inscription.passes,
              statut: inscription.statut,
              player: undefined,
              team: inscription.team
                ? {
                    id: inscription.team.id,
                    name: inscription.team.name,
                    tournoi: inscription.team.tournoi,
                  }
                : inscription.team,
              createdAt: inscription.createdAt,
              updatedAt: inscription.updatedAt,
              deletedAt: inscription.deletedAt,
            })) as Player['inscriptions']
          : undefined,
        createdAt: player.createdAt,
        updatedAt: player.updatedAt,
        deletedAt: player.deletedAt
      };
    }
  }
}
