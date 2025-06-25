import { IIDParamDTO } from 'app/dto';
import { Ticket } from 'src/ticket/domain';
import { ICreateTicketDTO, IUpdateTicketDTO } from '../dto';
export declare abstract class ITicketController {
    abstract all(): Promise<Ticket[]>;
    abstract show(param: IIDParamDTO): Promise<Ticket>;
    abstract create(data: ICreateTicketDTO, file?: any): Promise<Ticket>;
    abstract search(data: Partial<Ticket>, file?: any): Promise<Ticket>;
    abstract update(data: IUpdateTicketDTO, file?: any): Promise<Ticket>;
    abstract setState(param: IIDParamDTO): Promise<boolean>;
    abstract remove(param: IIDParamDTO): Promise<boolean>;
}
