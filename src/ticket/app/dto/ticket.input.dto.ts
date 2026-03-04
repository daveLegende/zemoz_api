
import { TicketType, TicketDuration, TicketState } from "../../domain/ticket.enum";

export interface ICreateTicketDTO {
  type: TicketType;

  duree: TicketDuration;

  etat: TicketState;

  user: string;

  amount: number;

  date: Date;

  lastScanDate?: Date;

  matchs?: string[];

  isDeleted?: boolean;

  qrCode?: string;

  code?: string;
}

export interface IUpdateTicketDTO extends Partial<ICreateTicketDTO> {
  id: string;
}
