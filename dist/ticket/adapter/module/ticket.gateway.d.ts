import { Server } from 'socket.io';
import { UpdateTicketDTO } from '../dto';
import { ITicketService } from 'src/ticket/app/module';
export declare class TicketGateway {
    private readonly ticketService;
    server: Server;
    constructor(ticketService: ITicketService);
    handleScanTicket(updateTicket: UpdateTicketDTO): void;
}
