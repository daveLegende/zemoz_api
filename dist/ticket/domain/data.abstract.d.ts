import { IGenericRepository } from "src/igeneric.interface";
import { Ticket } from "./ticket.model";
export declare abstract class ITicketRepository {
    abstract tickets: IGenericRepository<Ticket>;
}
