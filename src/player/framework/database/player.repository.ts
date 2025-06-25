import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DBGenericRepository } from 'framework/database.repository';
import { PlayerEntity } from './schema/player.entity';
import { IPlayerRepository, Player } from 'src/player/domain';
import { IGenericRepository } from 'src/igeneric.interface';

@Injectable()
export class PlayerRepository implements IPlayerRepository, OnApplicationBootstrap {
    players: IGenericRepository<Player>;
    
    constructor(
        @InjectRepository(PlayerEntity)
        private playerRepository: Repository<PlayerEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.players = new DBGenericRepository<PlayerEntity>(this.playerRepository);
    }
}
