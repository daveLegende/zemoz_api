// import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { UpdateHalfTimeDto, UpdateMatchScoreEventDto, UpdateStateDto } from '../dto';
// import { IMatchService } from '../../../match/app/module';

// // // @WebSocketGateway(81, { transports: ['websocket'] })
// // // export class MatchGateway {

// // //   private readonly logger = new Logger(MatchGateway.name);
// // //   public server: Server;

// // //   constructor(
// // //     private readonly matchService: IMatchService,
// // //     private readonly couponService: ICouponService,
// // //   ) {
// // //     // Initialisation du serveur Socket.IO
// // //     this.server = new Server();
// // //     this.logger.log('MatchGateway initialisé');
// // //   }
// // //   // @WebSocketServer()
// // //   // server: Server;

// // //   // constructor(private readonly matchService: IMatchService) {}

// // //   @SubscribeMessage('updateScore')
// // //   async handleScoreUpdate(@MessageBody() updateScoreDto: UpdateMatchScoreEventDto) {
// // //     try {
// // //       const updatedMatch = await this.matchService.updateScore(updateScoreDto);
// // //       console.log(updatedMatch);

// // //       // // Diffuser l'événement à tous les clients
// // //       // this.server.emit('scoreUpdated', updatedMatch);

// // //       console.log('Match mis à jour:', updatedMatch); // Log du match mis à jour

// // //       // Diffuser l'événement à tous les clients
// // //       this.server.emit('scoreUpdated', updatedMatch);
// // //       this.logger.log('Événement scoreUpdated émis');

// // //       // verification des coupons
// // //       const couponStatus = await this.couponService.validatePendingCoupons();
// // //       this.server.emit('couponStatusCheck', couponStatus);

// // //     } catch (error) {
// // //       console.error('Erreur lors de la mise à jour du score:', error.message);

// // //       // Tu peux également envoyer un message d'erreur au client si nécessaire
// // //       this.server.emit('error', { message: 'Erreur lors de la mise à jour du score' });
// // //     }
// // //   }


// // //   @SubscribeMessage('updateState')
// // //   async handleStateUpdate(@MessageBody() updateStateDto: UpdateStateDto) {
// // //     const updatedMatch = this.matchService.updateState(updateStateDto);
// // //     this.server.emit('stateUpdated', updatedMatch);

// // //     // verification des coupons
// // //     const couponStatus = await this.couponService.validatePendingCoupons();
// // //     this.server.emit('couponStatusCheck', couponStatus);
// // //   }
// // // }



// // @WebSocketGateway(81, { transports: ['websocket'] })
// // export class MatchGateway {
// //   @WebSocketServer()
// //   public server: Server;  // Utiliser @WebSocketServer pour initialiser correctement le serveur

// //   constructor(
// //     private readonly matchService: IMatchService,
// //     private readonly couponService: ICouponService,
// //     private readonly parisService: IParisService,
// //     private entityManager: EntityManager,
// //     private readonly userService: IUserService,
// //   ) {}

// //   @SubscribeMessage('updateScore')
// //   async handleScoreUpdate(@MessageBody() updateScoreDto: UpdateMatchScoreEventDto) {
// //     try {
// //       const updatedMatch = await this.matchService.updateScore(updateScoreDto);
// //       console.log('Match mis à jour:', updatedMatch);

// //       // Diffuser l'événement à tous les clients
// //       this.server.emit('scoreUpdated', updatedMatch); 

// //       // Vérifier les coupons en attente
// //       // const couponStatus = await this.couponService.validatePendingCoupons();
// //       // this.server.emit('couponStatusCheck', couponStatus);

// //     } catch (error) {
// //       console.error('Erreur lors de la mise à jour du score:', error.message);
// //       this.server.emit('error', { message: 'Erreur lors de la mise à jour du score' });
// //     }
// //   }

// //   @SubscribeMessage('updateState')
// //   async handleStateUpdate(@MessageBody() updateStateDto: UpdateStateDto) {
// //     const updatedMatch = await this.matchService.updateState(updateStateDto);
// //     this.server.emit('stateUpdated', updatedMatch);

// //     // const couponStatus = await this.couponService.validatePendingCoupons();
// //     // this.server.emit('couponStatusCheck', couponStatus);

// //     // this.server.on('stateUpdated', (updatedMatch) => {
// //     //   this.handleCustomState(updatedMatch.id, 'state');
// //     // });
// //   }

// //   @SubscribeMessage('listenForUpdates')
// //   async handleListenForUpdates(client: any) {
// //     // Écoute l'événement scoreUpdated
// //     // this.server.on('scoreUpdated', (updatedMatch) => {
// //     //   this.handleCustomState(updatedMatch, 'score');
// //     // });

// //     // Écoute l'événement stateUpdated
// //     this.server.on('stateUpdated', (updatedMatch) => {
// //       this.handleCustomState(updatedMatch, 'state');
// //     });

// //     // Accusé de réception
// //     client.emit('listeningStarted', { success: true });
// //   }

// //   private async handleCustomState(matchId: string, triggerType: string) {
// //     try {
// //       const pendingBets = await this.parisService.getPendingParisForMatch(matchId);
// //       const match = await this.matchService.fetchOne(matchId);
// //       const { home: homeScore, away: awayScore } = match.scores;

// //       // Déterminer le résultat une seule fois
// //       const matchResult = homeScore > awayScore ? 'V1' : 
// //                         homeScore < awayScore ? 'V2' : 'X';

// //       if (match.etat === MatchState.TERMINER) {
// //         // Traiter tous les paris dans une transaction
// //         await this.entityManager.transaction(async (transactionalEntityManager) => {
// //           for (const bet of pendingBets) {
// //             const isWinningBet = bet.type === matchResult;
// //             bet.isWon = isWinningBet;
// //             bet.state = isWinningBet ? 'Won' : 'Lost';

// //             if (isWinningBet) {
// //               const user = await this.userService.fetchOne(bet.user.id);

// //               // Ajoute les gains au solde existant
// //               user.solde += bet.potentialGain;
// //               await transactionalEntityManager.save(user);

// //               bet.isPaid = true;
// //             }

// //             await transactionalEntityManager.save(bet);
// //           }
// //         });

// //         // Émettre l'état personnalisé
// //         this.server.emit('customStateUpdated', {
// //           matchId: matchId,
// //           trigger: triggerType,
// //           timestamp: new Date(),
// //           status: 'custom_state_triggered',
// //           processedBets: pendingBets.length,
// //           data: matchId
// //         });

// //         console.log(`Pari traités pour le match ${matchId}`);
// //       }

// //     } catch (error) {
// //       console.error('Erreur dans handleCustomState:', error);
// //       this.server.emit('error', { 
// //         message: 'Erreur lors du traitement des paris',
// //         details: error.message
// //       });
// //     }
// //   }
// // }



// @WebSocketGateway(81, { transports: ['websocket'] })
// export class MatchGateway {
//   @WebSocketServer()
//   public server: Server;

//   constructor(
//     private readonly matchService: IMatchService,
//   ) { }

//   @SubscribeMessage('updateScore')
//   async handleScoreUpdate(@MessageBody() dto: UpdateMatchScoreEventDto) {
//     try {
//       const updatedMatch = await this.matchService.updateScore(dto);

//       this.server.emit('scoreUpdated', updatedMatch);

//     } catch (error) {
//       this.server.emit('error', { message: error.message });
//     }
//   }

//   @SubscribeMessage('updateState')
//   async handleStateUpdate(@MessageBody() dto: UpdateStateDto) {
//     try {
//       const updatedMatch = await this.matchService.updateState(dto);

//       this.server.emit('stateUpdated', updatedMatch);

//     } catch (error) {
//       this.server.emit('error', { message: error.message });
//     }
//   }

//   @SubscribeMessage('updateHalfTimeState')
//   async handleHalfTimeStateUpdate(@MessageBody() dto: UpdateHalfTimeDto) {
//     try {
//       const updatedMatch = await this.matchService.updateHalfTimeState(dto.id, dto.halfPauseState);

//       this.server.emit('halfTimeStateUpdated', updatedMatch);

//     } catch (error) {
//       this.server.emit('error', { message: error.message });
//     }
//   }
// }


import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UpdateHalfTimeDto, UpdateMatchScoreEventDto, UpdateStateDto } from '../dto';
import { IMatchService } from '../../../match/app/module';

@WebSocketGateway({
  transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class MatchGateway {

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly matchService: IMatchService,
  ) {}

  @SubscribeMessage('updateScore')
  async handleScoreUpdate(@MessageBody() dto: UpdateMatchScoreEventDto) {
    const updatedMatch = await this.matchService.updateScore(dto);
    this.server.emit('scoreUpdated', updatedMatch);
  }

  @SubscribeMessage('updateState')
  async handleStateUpdate(@MessageBody() dto: UpdateStateDto) {
    const updatedMatch = await this.matchService.updateState(dto);
    this.server.emit('stateUpdated', updatedMatch);
  }

  @SubscribeMessage('updateHalfTimeState')
  async handleHalfTimeStateUpdate(@MessageBody() dto: UpdateHalfTimeDto) {
    const updatedMatch = await this.matchService.updateHalfTimeState(dto.id, dto.halfPauseState);
    this.server.emit('halfTimeStateUpdated', updatedMatch);
  }
}