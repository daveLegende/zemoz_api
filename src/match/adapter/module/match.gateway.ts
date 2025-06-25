import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UpdateMatchScoreEventDto, UpdateStateDto } from '../dto';
import { IMatchService } from 'src/match/app/module';
import { Logger } from '@nestjs/common';
import { ICouponService } from 'src/coupon/app/module';
import { IUserService } from 'user/app/module/user';
import { IParisService } from 'src/paris/app/module';

// @WebSocketGateway(81, { transports: ['websocket'] })
// export class MatchGateway {

//   private readonly logger = new Logger(MatchGateway.name);
//   public server: Server;  // Assure-toi que `server` est public et bien défini

//   constructor(
//     private readonly matchService: IMatchService,
//     private readonly couponService: ICouponService,
//   ) {
//     // Initialisation du serveur Socket.IO
//     this.server = new Server();
//     this.logger.log('MatchGateway initialisé');
//   }
//   // @WebSocketServer()
//   // server: Server;

//   // constructor(private readonly matchService: IMatchService) {}

//   @SubscribeMessage('updateScore')
//   async handleScoreUpdate(@MessageBody() updateScoreDto: UpdateMatchScoreEventDto) {
//     try {
//       const updatedMatch = await this.matchService.updateScore(updateScoreDto);
//       console.log(updatedMatch);

//       // // Diffuser l'événement à tous les clients
//       // this.server.emit('scoreUpdated', updatedMatch);

//       console.log('Match mis à jour:', updatedMatch); // Log du match mis à jour

//       // Diffuser l'événement à tous les clients
//       this.server.emit('scoreUpdated', updatedMatch);
//       this.logger.log('Événement scoreUpdated émis');

//       // verification des coupons
//       const couponStatus = await this.couponService.validatePendingCoupons();
//       this.server.emit('couponStatusCheck', couponStatus);

//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du score:', error.message);
      
//       // Tu peux également envoyer un message d'erreur au client si nécessaire
//       this.server.emit('error', { message: 'Erreur lors de la mise à jour du score' });
//     }
//   }


//   @SubscribeMessage('updateState')
//   async handleStateUpdate(@MessageBody() updateStateDto: UpdateStateDto) {
//     const updatedMatch = this.matchService.updateState(updateStateDto);
//     this.server.emit('stateUpdated', updatedMatch);

//     // verification des coupons
//     const couponStatus = await this.couponService.validatePendingCoupons();
//     this.server.emit('couponStatusCheck', couponStatus);
//   }
// }



@WebSocketGateway(81, { transports: ['websocket'] })
export class MatchGateway {
  @WebSocketServer()
  public server: Server;  // Utiliser @WebSocketServer pour initialiser correctement le serveur

  constructor(
    private readonly matchService: IMatchService,
    private readonly couponService: ICouponService,
    // private readonly parisService: IParisService,
    // private readonly serService: IUserService,
  ) {}

  @SubscribeMessage('updateScore')
  async handleScoreUpdate(@MessageBody() updateScoreDto: UpdateMatchScoreEventDto) {
    try {
      const updatedMatch = await this.matchService.updateScore(updateScoreDto);
      console.log('Match mis à jour:', updatedMatch);

      // Diffuser l'événement à tous les clients
      this.server.emit('scoreUpdated', updatedMatch);  // Assurez-vous que l'émission est correcte

      // Vérifier les coupons en attente
      const couponStatus = await this.couponService.validatePendingCoupons();
      this.server.emit('couponStatusCheck', couponStatus);

    } catch (error) {
      console.error('Erreur lors de la mise à jour du score:', error.message);
      this.server.emit('error', { message: 'Erreur lors de la mise à jour du score' });
    }
  }

  @SubscribeMessage('updateState')
  async handleStateUpdate(@MessageBody() updateStateDto: UpdateStateDto) {
    const updatedMatch = await this.matchService.updateState(updateStateDto);
    this.server.emit('stateUpdated', updatedMatch);

    const couponStatus = await this.couponService.validatePendingCoupons();
    this.server.emit('couponStatusCheck', couponStatus);
  }

  @SubscribeMessage('listenForUpdates')
  async handleListenForUpdates(client: any) {
    // Écoute l'événement scoreUpdated
    this.server.on('scoreUpdated', (updatedMatch) => {
      this.handleCustomState(updatedMatch, 'score');
    });

    // Écoute l'événement stateUpdated
    this.server.on('stateUpdated', (updatedMatch) => {
      this.handleCustomState(updatedMatch, 'state');
    });

    // Accusé de réception
    client.emit('listeningStarted', { success: true });
  }

  private async handleCustomState(matchData: any, triggerType: string) {
    try {
      // 1. Récupérer tous les paris en pending pour ce match
      // const pendingBet = await this.parisService.paris.find();
      // 2. Déterminer le résultat du match

      // 3. Traiter chaque pari

        // Mettre à jour le statut du pari

        // Si le pari est gagnant, mettre à jour le portefeuille

      // Émettre un événement global

      // Créer votre nouvel état personnalisé ici
      const customState = {
        matchId: matchData.id,
        trigger: triggerType,
        timestamp: new Date(),
        status: 'custom_state_triggered',
        data: matchData
      };

      // Émettre le nouvel état
      this.server.emit('customStateUpdated', customState);
      
      // Log pour le débogage
      console.log(`Nouvel état personnalisé émis pour le match ${matchData.id}`);

    } catch (error) {
      console.error('Erreur dans handleCustomState:', error.message);
      this.server.emit('error', { 
        message: 'Erreur lors du traitement de l\'état personnalisé',
        details: error.message
      });
    }
  }
}
