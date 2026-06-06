import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DBGenericRepository } from '../../_shared/framework/database.repository';
import { IGenericRepository } from '../../igeneric.interface';
import { Repository } from 'typeorm';
import { Bet } from '../domain';
import { IBetRepository } from '../domain/data.abstract';
import { BetEntity } from './schema/bet.entity';

@Injectable()
export class BetRepository implements IBetRepository, OnApplicationBootstrap {
  bets: IGenericRepository<Bet>;

  constructor(
    @InjectRepository(BetEntity)
    private betRepository: Repository<BetEntity>,
  ) {}

  onApplicationBootstrap(): void {
    this.bets = new DBGenericRepository<BetEntity>(this.betRepository);
  }
}
