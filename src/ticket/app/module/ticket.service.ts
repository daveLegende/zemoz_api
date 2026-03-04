import { Ticket } from "../../domain";
import { ICreateTicketDTO, IUpdateTicketDTO } from "../dto";


export abstract class ITicketService {
  abstract add(data: ICreateTicketDTO): Promise<Ticket>;

  abstract fetchAll(): Promise<Ticket[]>;

  abstract fetchOne(id: string): Promise<Ticket>;

  abstract edit(data: IUpdateTicketDTO): Promise<Ticket>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Ticket>): Promise<Ticket>;

  abstract remove(id: string): Promise<boolean>;

  abstract scanTicket(qrCode: string): Promise<Ticket>;
}
