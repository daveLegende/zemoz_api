/// <reference types="multer" />
import { IDParamDTO } from 'adapter/dto';
import { IPlayerController, IPlayerService } from 'src/player/app/module';
import { Player } from 'src/player/domain';
import { PlayerAccoutDTO, UpdatePlayerDTO } from '../dto';
export declare class PlayerController implements IPlayerController {
    private readonly playerService;
    constructor(playerService: IPlayerService);
    all(): Promise<Player[]>;
    search(param: Player): Promise<Player>;
    show({ id }: IDParamDTO): Promise<Player>;
    create(data: PlayerAccoutDTO, file: Express.Multer.File): Promise<Player>;
    update(data: UpdatePlayerDTO, file: Express.Multer.File): Promise<Player>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
