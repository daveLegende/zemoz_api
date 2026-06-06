import { ICreateArbitreDTO, IUpdateArbitreDTO } from '../app/dto';
import { Arbitre } from '../domain';

export abstract class ArbitreFactory {
  static async create(data: ICreateArbitreDTO): Promise<Arbitre> {
    const arbitre = new Arbitre();

    arbitre.name = data.name;
    arbitre.phone = data.phone;
    arbitre.avatar = data.avatar;

    return arbitre;
  }

  static update(arbitre: Arbitre, data: IUpdateArbitreDTO): Arbitre {
    arbitre.name = data.name ?? arbitre.name;
    arbitre.phone = data.phone ?? arbitre.phone;
    arbitre.role = data.role ?? arbitre.role;
    arbitre.avatar = data.avatar ?? arbitre.avatar;

    return arbitre;
  }

  static getFileLink(file: string): string {
    if (file) {
      return `${process.env.APP_BASE_URL}/files/${file}`;
    }
  }

  static getArbitre(arbitre: Arbitre): Arbitre {
    if (arbitre) {
      return {
        id: arbitre.id,
        name: arbitre.name,
        avatar: arbitre.avatar,
        phone: arbitre.phone,
        role: arbitre.role,
        matchs: arbitre.matchs,
        createdAt: arbitre.createdAt,
        updatedAt: arbitre.updatedAt,
        deletedAt: arbitre.deletedAt,
      };
    }
  }
}
