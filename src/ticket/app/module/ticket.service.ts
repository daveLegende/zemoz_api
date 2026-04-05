import { Ticket } from "../../domain";
import { ICreateTicketDTO, IUpdateTicketDTO } from "../dto";
import { PaginationOptionsDto } from "../../../_shared/adapter/dto/pagination-options.dto";
import { PaginationResultDto } from "../../../_shared/adapter/dto/pagination-result.dto";


export abstract class ITicketService {
  abstract add(data: ICreateTicketDTO): Promise<Ticket>;

  abstract fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<Ticket>>;

  abstract fetchOne(id: string): Promise<Ticket>;

  abstract edit(data: IUpdateTicketDTO): Promise<Ticket>;

  abstract setState(id: string): Promise<boolean>;

  abstract search(data: Partial<Ticket>): Promise<Ticket>;

  abstract remove(id: string): Promise<boolean>;

  abstract scanTicket(qrCode: string): Promise<Ticket>;
}
