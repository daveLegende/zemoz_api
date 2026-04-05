import { IGenericRepository } from "../../igeneric.interface";
import { Player } from "./player.model";


export abstract class IPlayerRepository {
    abstract players: IGenericRepository<Player>;
}