import { OnApplicationBootstrap } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IGenericRepository } from 'src/igeneric.interface';
import { ITicketRepository, Ticket } from 'src/ticket/domain';
import { TicketEntity } from './schema/ticket.entity';
export declare class TicketRepository implements ITicketRepository, OnApplicationBootstrap {
    private TicketRepository;
    tickets: IGenericRepository<Ticket>;
    constructor(TicketRepository: Repository<TicketEntity>);
    onApplicationBootstrap(): void;
}
