/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { IIDParamDTO } from 'app/dto';
import { Ticket } from '../../domain';
import { ICreateTicketDTO, IUpdateTicketDTO } from '../dto';

export abstract class ITicketController {
  abstract all(): Promise<Ticket[]>;

  abstract show(param: IIDParamDTO): Promise<Ticket>;

  abstract create(data: ICreateTicketDTO, file?: any): Promise<Ticket>;

  abstract search(data: Partial<Ticket>, file?: any): Promise<Ticket>;

  abstract update(data: IUpdateTicketDTO, file?: any): Promise<Ticket>;

  abstract setState(param: IIDParamDTO): Promise<boolean>;

  abstract remove(param: IIDParamDTO): Promise<boolean>;

  abstract scanTicket(qrCode: string): Promise<Ticket>;
}
