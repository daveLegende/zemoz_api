import { ITimestamp } from 'domain/interface';
import { TicketDuration, TicketState, TicketType } from './ticket.enum';
import { User } from 'user/domain';
export declare class Ticket extends ITimestamp {
    id: string;
    type: TicketType;
    duree: TicketDuration;
    amount: number;
    date: Date;
    lastScanDate?: Date;
    etat: TicketState;
    user: User;
    matchs?: string[];
    isDeleted: boolean;
}
