import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UpdateTicketDTO } from '../dto';
import { ITicketService } from 'src/ticket/app/module';

@WebSocketGateway(81, { transports: ['websocket'] })
export class TicketGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly ticketService: ITicketService) {}

  @SubscribeMessage('scanTicket')
  handleScanTicket(@MessageBody() updateTicket: UpdateTicketDTO) {
    const updatedMatch = this.ticketService.edit(updateTicket);
    this.server.emit('ticketScanned', updatedMatch);
  }


//   @SubscribeMessage('updateState')
//   handleStateUpdate(@MessageBody() updateStateDto: UpdateStateDto) {
//     const updatedMatch = this.ticketService.updateState(updateStateDto);
//     this.server.emit('stateUpdated', updatedMatch);
//   }
}