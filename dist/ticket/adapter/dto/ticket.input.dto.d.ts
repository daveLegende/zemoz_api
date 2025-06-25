import { TicketDuration, TicketState, TicketType } from 'src/ticket/domain/ticket.enum';
export declare class TicketAccoutDTO {
    type: TicketType;
    duree: TicketDuration;
    etat: TicketState;
    user: string;
    amount: number;
    date: Date;
    lastScanDate?: Date;
    matchs?: string[];
    isDeleted?: boolean;
}
declare const UpdateTicketDTO_base: import("@nestjs/common").Type<Partial<TicketAccoutDTO>>;
export declare class UpdateTicketDTO extends UpdateTicketDTO_base {
    id: string;
}
export {};
