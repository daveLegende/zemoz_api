import { IGenericRepository } from "../../igeneric.interface";
import { Player } from "./player.model";
import { TeamPlayer } from "./team-player.model";


export abstract class IPlayerRepository {
    abstract players: IGenericRepository<Player>;
}

export abstract class ITeamPlayerRepository {
    abstract inscriptions: IGenericRepository<TeamPlayer>;
}
