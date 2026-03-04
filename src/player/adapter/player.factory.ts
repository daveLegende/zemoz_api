import { Team } from "../../team/domain";
import { ICreatePlayerDTO, IUpdatePlayerDTO } from "../app/dto";
import { Player } from '../domain'


export abstract class PlayerFactory {
  static async create(data: ICreatePlayerDTO, equipe: Team): Promise<Player> {
    const player = new Player();
    player.age = data.age;
    player.phone = data.phone;
    player.firstname = data.firstname;
    player.lastname = data.lastname;
    player.avatar = data.avatar;
    player.team = equipe;

    return player;
  }

  static update(player: Player, data: IUpdatePlayerDTO): Player {

    player.age = data.age ?? player.age;
    player.phone = data.phone ?? player.phone;
    player.firstname = data.firstname ?? player.firstname;
    player.lastname = data.lastname ?? player.lastname;
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
        firstname: player.firstname,
        lastname: player.lastname,
        age: player.age,
        phone: player.phone,
        buts: player.buts,
        passes: player.passes,
        team: player.team,
        avatar: this.getFileLink(player.avatar),
        createdAt: player.createdAt,
        updatedAt: player.updatedAt,
        deletedAt: player.deletedAt
      };
    }
  }
}
