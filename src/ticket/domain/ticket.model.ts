import { ITimestamp } from 'domain/interface';
import { TicketDuration, TicketState, TicketType } from './ticket.enum';
import { User } from 'user/domain';
import { Match } from 'src/match/domain';


export class Ticket extends ITimestamp {
  id: string;
  type: TicketType;
  duree: TicketDuration;
  amount: number;
  date: Date;
  etat: TicketState;
  user: User;
  match?: Match;
}
