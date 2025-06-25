import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PlayerEntity } from './schema/player.entity';
import { IPlayerRepository, Player } from 'src/player/domain';
import { IGenericRepository } from 'src/igeneric.interface';
export declare class PlayerRepository implements IPlayerRepository, OnApplicationBootstrap {
    private playerRepository;
    players: IGenericRepository<Player>;
    constructor(playerRepository: Repository<PlayerEntity>);
    onApplicationBootstrap(): void;
}
