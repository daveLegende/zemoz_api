import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UpdateMatchScoreEventDto, UpdateStateDto } from '../dto';
import { IMatchService } from 'src/match/app/module';
import { Logger } from '@nestjs/common';
import { ICouponService } from 'src/coupon/app/module';

@WebSocketGateway(81, { transports: ['websocket'] })
export class MatchGateway {

  private readonly logger = new Logger(MatchGateway.name);
  public server: Server;  // Assure-toi que `server` est public et bien défini

  constructor(
    private readonly matchService: IMatchService,
    private readonly couponService: ICouponService,
  ) {
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

      // verification des coupons
      const couponStatus = await this.couponService.validatePendingCoupons();
      this.server.emit('couponStatusCheck', couponStatus);

    } catch (error) {
      console.error('Erreur lors de la mise à jour du score:', error.message);
      
      // Tu peux également envoyer un message d'erreur au client si nécessaire
      this.server.emit('error', { message: 'Erreur lors de la mise à jour du score' });
    }
  }


  @SubscribeMessage('updateState')
  async handleStateUpdate(@MessageBody() updateStateDto: UpdateStateDto) {
    const updatedMatch = this.matchService.updateState(updateStateDto);
    this.server.emit('stateUpdated', updatedMatch);

    // verification des coupons
    const couponStatus = await this.couponService.validatePendingCoupons();
    this.server.emit('couponStatusCheck', couponStatus);
  }
}