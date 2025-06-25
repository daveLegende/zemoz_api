import { ATimestamp } from 'framework/timestamp.abstract';
import { TicketDuration, TicketState, TicketType } from 'src/ticket/domain/ticket.enum';
import { UserEntity } from 'user/framework/database/schema/user.entity';
import { Ticket } from 'src/ticket/domain';
export declare class TicketEntity extends ATimestamp implements Ticket {
    id: string;
    type: TicketType;
    duree: TicketDuration;
    etat: TicketState;
    user: UserEntity;
    amount: number;
    date: Date;
    lastScanDate: Date;
    matchs: string[];
    isDeleted: boolean;
}
