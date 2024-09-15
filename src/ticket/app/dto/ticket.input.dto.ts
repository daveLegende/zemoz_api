import { TicketType, TicketDuration, TicketState } from "src/ticket/domain/ticket.enum";
import { User } from "user/domain";

export interface ICreateTicketDTO {
  type: TicketType;

  duree: TicketDuration;

  etat: TicketState;

  user: string;

  amount: number;

  date: Date;

  match?: string;
}

export interface IUpdateTicketDTO extends Partial<ICreateTicketDTO> {
  id: string;
}
