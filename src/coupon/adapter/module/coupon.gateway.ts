// import { Injectable, Logger } from '@nestjs/common';
// import { Socket } from 'dgram';

// @Injectable()
// export class CouponService {
//   private socket: Socket;
//   private logger = new Logger('CouponService');

//   constructor() {
//     this.socket = io('http://localhost:81', { transports: ['websocket'] });

//     // Écouter les mises à jour des scores
//     this.socket.on('scoreUpdated', (match) => {
//       this.logger.log(`Score mis à jour pour le match ${match.id}`);
//       this.checkCoupons(match);
//     });

//     // Écouter les mises à jour de l'état du match (par exemple : terminé)
//     this.socket.on('stateUpdated', (match) => {
//       this.logger.log(`État mis à jour pour le match ${match.id}`);
//       this.checkCoupons(match);
//     });
//   }

//   // Comparer le match mis à jour avec les paris des coupons
//   private async checkCoupons(match: any) {
//     // 1. Récupérer tous les coupons actifs
//     const coupons = await this.getActiveCoupons(); // Fonction à implémenter pour récupérer les coupons

//     // 2. Vérifier chaque coupon pour voir s'il contient des paris pour ce match
//     coupons.forEach((coupon) => {
//       const relevantBets = coupon.bets.filter((bet) => bet.matchId === match.id);

//       // 3. Vérifier si les paris correspondent aux scores/événements du match
//       relevantBets.forEach((bet) => {
//         if (this.isBetWinning(bet, match)) {
//           this.logger.log(`Bet ${bet.id} a gagné`);
//           // Mettre à jour le statut du pari ou du coupon
//           this.updateBetStatus(bet.id, 'gagné');
//         } else {
//           this.logger.log(`Bet ${bet.id} a perdu`);
//           this.updateBetStatus(bet.id, 'perdu');
//         }
//       });
//     });
//   }

//   // Exemple de vérification si un pari a gagné
//   private isBetWinning(bet: any, match: any): boolean {
//     // Exemple de logique pour vérifier un pari
//     switch (bet.type) {
//       case 'Victoire':
//         if (bet.selection === 'V1' && match.scores.home > match.scores.away) return true;
//         if (bet.selection === 'V2' && match.scores.away > match.scores.home) return true;
//         if (bet.selection === 'X' && match.scores.home === match.scores.away) return true;
//         break;
//       case 'Deux Équipes Marquent':
//         return match.scores.home > 0 && match.scores.away > 0;
//       case 'Carton Rouge':
//         return match.events.some((event) => event.type === 'CARTON_ROUGE');
//       case 'Carton Jaune':
//         return match.events.filter((event) => event.type === 'CARTON_JAUNE').length >= bet.selection; // Exemple
//       default:
//         return false;
//     }
//     return false;
//   }

//   // Mettre à jour le statut d'un pari
//   private updateBetStatus(betId: string, status: string) {
//     // Fonction pour mettre à jour le statut du pari dans la base de données
//     this.logger.log(`Mise à jour du statut du pari ${betId} à ${status}`);
//   }

//   // Fonction pour récupérer tous les coupons actifs
//   private async getActiveCoupons(): Promise<any[]> {
//     // Logique pour récupérer les coupons en cours dans la base de données
//     return []; // À implémenter
//   }
// }
