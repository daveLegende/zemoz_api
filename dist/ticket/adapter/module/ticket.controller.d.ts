import { IDParamDTO } from 'adapter/dto';
import { ITicketController, ITicketService } from 'src/ticket/app/module';
import { Ticket } from 'src/ticket/domain';
import { TicketAccoutDTO, UpdateTicketDTO } from '../dto';
export declare class TicketController implements ITicketController {
    private readonly ticketService;
    constructor(ticketService: ITicketService);
    all(): Promise<Ticket[]>;
    search(param: Ticket): Promise<Ticket>;
    show({ id }: IDParamDTO): Promise<Ticket>;
    create(data: TicketAccoutDTO): Promise<Ticket>;
    update(data: UpdateTicketDTO): Promise<Ticket>;
    setState({ id }: IDParamDTO): Promise<boolean>;
    remove({ id }: IDParamDTO): Promise<boolean>;
}
