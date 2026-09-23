import { Account } from "../../account/domain/account.model";
import { ICreateTicketDTO, IUpdateTicketDTO } from "../app/dto";
import { Ticket } from '../domain';

export abstract class TicketFactory {
  static async create(data: ICreateTicketDTO, account: Account, matchs: any[] = []): Promise<Ticket> {
    const ticket = new Ticket();
    ticket.type = data.type;
    ticket.duree = data.duree;
    ticket.position = data.position;
    ticket.qrCode = data.qrCode;
    ticket.code = data.code;
    ticket.etat = data.etat;
    ticket.amount = data.amount;
    ticket.account = account;
    ticket.date = data.date;
    ticket.matchs = matchs;

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
        account: ticket.account,
        date: ticket.date,
        qrCode: ticket.qrCode,
        code: ticket.code,
        matchs: ticket.matchs,
        isDeleted: ticket.isDeleted,
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
        deletedAt: ticket.deletedAt
      };
    }
  }
}
