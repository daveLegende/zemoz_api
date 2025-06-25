import { Team } from "src/team/domain";
import { ICreatePlayerDTO, IUpdatePlayerDTO } from "../app/dto";
import { Player } from '../domain';
export declare abstract class PlayerFactory {
    static create(data: ICreatePlayerDTO, equipe: Team): Promise<Player>;
    static update(player: Player, data: IUpdatePlayerDTO): Player;
    static getFileLink(file: string): string;
    static getPlayer(player: Player): Player;
}
