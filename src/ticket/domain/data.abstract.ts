import { IGenericRepository } from '../../igeneric.interface';
import { Ticket } from './ticket.model';

export abstract class ITicketRepository {
  abstract tickets: IGenericRepository<Ticket>;
}
