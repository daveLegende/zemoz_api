import { ITimestamp } from '../../_shared/domain/interface';
import {
  TicketDuration,
  TicketPosition,
  TicketState,
  TicketType,
} from './ticket.enum';
import { User } from '../../user/domain';
import { Match } from '../../match/domain';

export class Ticket extends ITimestamp {
  id: string;
  type: TicketType;
  duree: TicketDuration;
  amount: number;
  date: Date;
  lastScanDate?: Date;
  etat: TicketState;
  user: User;
  position?: TicketPosition;
  qrCode?: string;
  code?: string;
  matchs?: Match[];
  isDeleted: boolean;
}
