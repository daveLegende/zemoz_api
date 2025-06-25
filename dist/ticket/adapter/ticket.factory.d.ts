import { User } from "user/domain";
import { ICreateTicketDTO, IUpdateTicketDTO } from "../app/dto";
import { Ticket } from '../domain';
export declare abstract class TicketFactory {
    static create(data: ICreateTicketDTO, user: User): Promise<Ticket>;
    static update(ticket: Ticket, data: IUpdateTicketDTO): Ticket;
    static getTicket(ticket: Ticket): Ticket;
}
