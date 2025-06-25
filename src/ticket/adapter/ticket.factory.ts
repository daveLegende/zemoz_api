import { User } from "user/domain";
import { ICreateTicketDTO, IUpdateTicketDTO } from "../app/dto";
import { Ticket } from '../domain'


export abstract class TicketFactory {
  static async create(data: ICreateTicketDTO, user: User): Promise<Ticket> {
    const ticket = new Ticket();
    ticket.type = data.type;
    ticket.duree = data.duree;
    ticket.etat = data.etat;
    ticket.amount = data.amount;
    ticket.user = user;
    ticket.date = data.date;
    
    return ticket;
  }

  static update(ticket: Ticket, data: IUpdateTicketDTO): Ticket {

    ticket.type = data.type ?? ticket.type;
    ticket.duree = data.duree ?? ticket.duree;
    ticket.etat = data.etat ?? ticket.etat;
    ticket.amount = data.amount ?? ticket.amount;
    ticket.date = data.date;
    ticket.isDeleted = data.isDeleted;

    return ticket;
  }

  static getTicket(ticket: Ticket): Ticket {
    if (ticket) {
      return {
        id: ticket.id,
        type: ticket.type,
        duree: ticket.duree,
        etat: ticket.etat,
        amount: ticket.amount,
        user: ticket.user,
        date: ticket.date,
        matchs: ticket.matchs,
        isDeleted: ticket.isDeleted,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        deletedAt: ticket.deletedAt
      };
    }
  }
}
