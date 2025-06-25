import { IPlayerService } from 'src/player/app/module';
import { IPlayerRepository, Player } from 'src/player/domain';
import { PlayerAccoutDTO, UpdatePlayerDTO } from '../dto';
import { ITeamRepository } from 'src/team/domain';
export declare class PlayerService implements IPlayerService {
    private playerRepository;
    private teamRepository;
    private readonly logger;
    constructor(playerRepository: IPlayerRepository, teamRepository: ITeamRepository);
    fetchAll(): Promise<Player[]>;
    fetchOne(id: string): Promise<Player>;
    search(data: Partial<Player>): Promise<Player>;
    add(data: PlayerAccoutDTO): Promise<Player>;
    edit(data: UpdatePlayerDTO): Promise<Player>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
