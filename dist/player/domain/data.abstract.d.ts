import { IGenericRepository } from "src/igeneric.interface";
import { Player } from "./player.model";
export declare abstract class IPlayerRepository {
    abstract players: IGenericRepository<Player>;
}
