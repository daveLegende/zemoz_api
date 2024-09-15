import { Player } from "src/player/domain";
import { ICreatePlayerDTO, IUpdatePlayerDTO } from "../dto";


export abstract class IPlayerService {
  abstract add(data: ICreatePlayerDTO): Promise<Player>;

  abstract fetchAll(): Promise<Player[]>;

  abstract fetchOne(id: string): Promise<Player>;

  abstract edit(data: IUpdatePlayerDTO): Promise<Player>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Player>): Promise<Player>;

  abstract remove(id: string): Promise<boolean>;
}
