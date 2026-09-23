import { Ticket } from "../../domain";
import { ICreateTicketDTO, IUpdateTicketDTO } from "../dto";


import { PaginatedResult, PaginationQuery } from '../../../_shared/domain/pagination';
export abstract class ITicketService {
  abstract add(data: ICreateTicketDTO): Promise<Ticket>;

  abstract fetchAll(query?: PaginationQuery): Promise<PaginatedResult<Ticket>>;

  abstract fetchOne(id: string): Promise<Ticket>;

  abstract edit(data: IUpdateTicketDTO): Promise<Ticket>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Ticket>): Promise<Ticket>;

  abstract remove(id: string): Promise<boolean>;

  abstract scanTicket(qrCode: string): Promise<Ticket>;
}
