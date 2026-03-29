import { Team } from "../../team/domain";
import { ICreatePlayerDTO, IUpdatePlayerDTO } from "../app/dto";
import { Player } from '../domain'


export abstract class PlayerFactory {
  static async create(data: ICreatePlayerDTO, equipe: Team): Promise<Player> {
    const player = new Player();
    player.age = data.age;
    player.phone = data.phone;
    player.name = data.name;
    player.avatar = data.avatar;
    player.team = equipe;

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

  static getPlayer(player: Player): Player {
    if (player) {
      return {
        id: player.id,
        name: player.name,
        age: player.age,
        phone: player.phone,
        buts: player.buts,
        passes: player.passes,
        team: player.team,
        avatar: player.avatar,
        createdAt: player.createdAt,
        updatedAt: player.updatedAt,
        deletedAt: player.deletedAt
      };
    }
  }
}
