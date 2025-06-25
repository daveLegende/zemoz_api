import { ITicketService } from 'src/ticket/app/module';
import { ITicketRepository, Ticket } from 'src/ticket/domain';
import { TicketAccoutDTO, UpdateTicketDTO } from '../dto';
import { IUserRepository } from 'user/domain';
import { IMatchRepository } from 'src/match/domain';
export declare class TicketService implements ITicketService {
    private ticketRepository;
    private userRepository;
    private matchRepository;
    private readonly logger;
    constructor(ticketRepository: ITicketRepository, userRepository: IUserRepository, matchRepository: IMatchRepository);
    fetchAll(): Promise<Ticket[]>;
    fetchOne(id: string): Promise<Ticket>;
    search(data: Partial<Ticket>): Promise<Ticket>;
    add(data: TicketAccoutDTO): Promise<Ticket>;
    edit(data: UpdateTicketDTO): Promise<Ticket>;
    private isSameDay;
    areGroupStagesOver(): Promise<boolean>;
    setState(id: string): Promise<boolean>;
    remove(id: string): Promise<boolean>;
}
