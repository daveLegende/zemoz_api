// import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
// import { Server } from "socket.io";
// import { IMatchService } from "src/match/app/module";
// import { IParisService } from "src/paris/app/module";
// import { IUserService } from "user/app/module/user";

// @WebSocketGateway(81, { transports: ['websocket'] })
// export class ParisGateway {
//   @WebSocketServer()
//   public server: Server;  // Utiliser @WebSocketServer pour initialiser correctement le serveur

//   constructor(
//     private readonly matchService: IMatchService,
//     private readonly userService: IUserService,
//     private readonly parisService: IParisService,
//   ) {}

//   @SubscribeMessage('updateScore')
//   async handleScoreUpdate(@MessageBody() updateScoreDto: UpdateMatchScoreEventDto) {
//     try {
//       const updatedMatch = await this.matchService.updateScore(updateScoreDto);
//       console.log('Match mis à jour:', updatedMatch);

//       // Diffuser l'événement à tous les clients
//       this.server.emit('scoreUpdated', updatedMatch);  // Assurez-vous que l'émission est correcte

//       // Vérifier les coupons en attente
//       const couponStatus = await this.parisService.validatePendingCoupons();
//       this.server.emit('couponStatusCheck', couponStatus);

//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du score:', error.message);
//       this.server.emit('error', { message: 'Erreur lors de la mise à jour du score' });
//     }
//   }

//   @SubscribeMessage('updateState')
//   async handleStateUpdate(@MessageBody() updateStateDto: UpdateStateDto) {
//     const updatedMatch = await this.matchService.updateState(updateStateDto);
//     this.server.emit('stateUpdated', updatedMatch);

//     const couponStatus = await this.parisService.validatePendingCoupons();
//     this.server.emit('couponStatusCheck', couponStatus);
//   }
// }