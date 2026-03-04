import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DBGenericRepository } from 'framework/database.repository';
import { PlayerEntity } from './schema/player.entity';
import { IPlayerRepository, Player } from '../../domain';
import { IGenericRepository } from '../../../igeneric.interface';

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
