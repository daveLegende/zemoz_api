import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UpdateMatchScoreEventDto, UpdateStateDto } from '../dto';
import { IMatchService } from 'src/match/app/module';
import { Logger } from '@nestjs/common';

@WebSocketGateway(81, { transports: ['websocket'] })
export class MatchGateway {

  private readonly logger = new Logger(MatchGateway.name);
  public server: Server;  // Assure-toi que `server` est public et bien défini

  constructor(private readonly matchService: IMatchService) {
    // Initialisation du serveur Socket.IO
    this.server = new Server();
    this.logger.log('MatchGateway initialisé');
  }
  // @WebSocketServer()
  // server: Server;

  // constructor(private readonly matchService: IMatchService) {}

  @SubscribeMessage('updateScore')
  async handleScoreUpdate(@MessageBody() updateScoreDto: UpdateMatchScoreEventDto) {
    try {
      const updatedMatch = await this.matchService.updateScore(updateScoreDto);
      console.log(updatedMatch);

      // Diffuser l'événement à tous les clients
      this.server.emit('scoreUpdated', updatedMatch);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du score:', error.message);
      
      // Tu peux également envoyer un message d'erreur au client si nécessaire
      this.server.emit('error', { message: 'Erreur lors de la mise à jour du score' });
    }
  }


  @SubscribeMessage('updateState')
  handleStateUpdate(@MessageBody() updateStateDto: UpdateStateDto) {
    const updatedMatch = this.matchService.updateState(updateStateDto);
    this.server.emit('stateUpdated', updatedMatch);
  }
}