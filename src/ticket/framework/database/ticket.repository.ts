import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DBGenericRepository } from '../../../_shared/framework/database.repository';
import { IGenericRepository } from '../../../igeneric.interface';
import { ITicketRepository, Ticket } from '../../domain';
import { TicketEntity } from './schema/ticket.entity';


@Injectable()
export class TicketRepository implements ITicketRepository, OnApplicationBootstrap {
    tickets: IGenericRepository<Ticket>;
    
    constructor(
        @InjectRepository(TicketEntity)
        private TicketRepository: Repository<TicketEntity>,
    ) {}

    onApplicationBootstrap(): void {
        this.tickets = new DBGenericRepository<TicketEntity>(this.TicketRepository);
    }
}
