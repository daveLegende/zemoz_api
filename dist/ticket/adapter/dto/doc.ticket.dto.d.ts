import { TicketType, TicketDuration, TicketState } from 'src/ticket/domain/ticket.enum';
export declare class DocTicketOutputDTO {
    id: string;
    type: TicketType;
    duree: TicketDuration;
    etat: TicketState;
    user: string;
    amount: number;
    date: Date;
    match?: string;
}
