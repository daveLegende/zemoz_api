// import {
//   BadRequestException,
//   ConflictException,
//   forwardRef,
//   Inject,
//   Injectable,
//   Logger,
//   NotFoundException,
// } from '@nestjs/common';
// import { ICouponService } from 'src/coupon/app/module';
// import { Coupon, CouponState } from 'src/coupon/domain';
// import { CouponAccountDto, UpdateCouponDTO } from '../dto';
// import { ICouponRepository } from 'src/coupon/domain/data.abstract';
// import { IUserRepository } from 'user/domain';
// import { CouponFactory } from '../coupon.factory';
// import { IBetRepository } from 'src/bet/domain/data.abstract';
// import { ICouponBetRepository } from 'src/couponBet/domain/data.abstract';
// import { BetStatus, CouponBet } from 'src/couponBet/domain';
// import { MatchGateway } from 'src/match/adapter/module/match.gateway';
// import { IMatchRepository, Match, MatchState } from 'src/match/domain';
// import { Connection } from 'typeorm';
// import { CategoryName } from 'src/bet/domain';
// import { UpdateMatchDTO } from 'src/match/import { IDParamDTO } from '../../../_shared/adapter/dto';';

// @Injectable()
// export class CouponService implements ICouponService {
//   private readonly logger = new Logger();
//   constructor(
//     private readonly connection: Connection, 
//     private couponsRepository: ICouponRepository,
//     private userRepository: IUserRepository,
//     private betRepository: IBetRepository,
//     private cpRepository: ICouponBetRepository,
//     private matchRepository: IMatchRepository,
//     // 
//     @Inject(forwardRef(() => MatchGateway)) // Injection du Gateway
//     private readonly matchGateway: MatchGateway,
//   ) {
//     // Écouter les mises à jour des scores
//     // this.matchGateway.server.on('scoreUpdated', (match) => {
//     //   this.logger.log(`Score mis à jour pour le match ${match.id}`);
//     //   this.checkCoupons(match); // Vérifier les coupons quand le score est mis à jour
//     // });

//     // // Écouter les mises à jour de l'état du match (par exemple : match terminé)
//     // this.matchGateway.server.on('stateUpdated', (match) => {
//     //   this.logger.log(`État mis à jour pour le match ${match.id}`);
//     //   this.checkCoupons(match); // Vérifier les coupons quand l'état est mis à jour
//     // });
//   }

//   async fetchAll(): Promise<Coupon[]> {
//     try {
//       return await this.couponsRepository.coupons.find({
//         relations: {
//           user: true, 
//           couponBets: {
//             bet: {
//               match: true, // Récupérer le match lié au bet
//             },
//           },
//         },
//         order: {
//           createdAt: 'DESC',
//         },
//       });
//     } catch (error) {
//       this.logger.error(error.message, 'ERROR::couponsService.fetchAll');
//       throw error;
//     }
//   }

//   async fetchOne(id: string): Promise<Coupon> {
//     try {
//       const coupons = await this.couponsRepository.coupons.findOne({
//         where: { id: id },
//         relations: { 
//           user: true, 
//           couponBets: {
//             bet: {
//               match: true, // Récupérer le match lié au bet
//             },
//           },
//         },
//         order: {
//           createdAt: 'DESC',
//         },
//       });
//       if (coupons) {
//         return coupons;
//       }
//       throw new NotFoundException('coupons not found');
//     } catch (error) {
//       this.logger.error(error.message, 'ERROR::couponsService.fetchOne');
//       throw error;
//     }
//   }

//   async search(data: Partial<Coupon>): Promise<Coupon> {
//     return await this.couponsRepository.coupons.findOneBy({ ...data });
//   }

//   async add(data: CouponAccountDto): Promise<Coupon> {
//     try {
//       const { amount, user, couponBets } = data;

//       const userExisted = await this.userRepository.users.findOneByID(user);
//       if(!userExisted) throw new NotFoundException("Utilisateur non trouvé");

//       let totalOdds = 1;

//       // Vérification et calcul des cotes
//       for(const cp of couponBets) {
//         const betExisted = await this.betRepository.bets.findOneByID(cp.id);
//         if (!betExisted) {
//           throw new NotFoundException(`Bet non trouvé`);
//         }

//         // Calcul des cotes en fonction des options sélectionnées
//         const selectedOdds = cp.selectedOptions[Object.keys(cp.selectedOptions)[0]];
//         totalOdds *= selectedOdds;
//       }

//       // Calcul des gains
//       const gains = totalOdds * amount;

//       if (amount < 100) {
//         throw new BadRequestException("Une mise minimum de 100frs");
//       } else if (amount > 100000) {
//         throw new BadRequestException("La mise ne doit pas dépassée 100000frs");
//       } else {
//         if (amount > userExisted.solde) {
//           throw new BadRequestException("Votre solde est insuffisant veuillez le recharger");
//         } else {
//           userExisted.solde -= amount;

//           // Mise à jour du DTO avec les nouveaux calculs
//           const couponData = {
//             ...data,
//             totalOdds: totalOdds,
//             gains: gains,
//           };

//           const coupon = await this.couponsRepository.coupons.create(
//             await CouponFactory.create(couponData, userExisted),
//           );
//           await this.userRepository.users.update(userExisted);

//           // Création des CouponBets
//           for (const cp of couponBets) {
//             const cpbDto = new CouponBet();
//             cpbDto.coupon = coupon;
//             cpbDto.bet = cp.bet;
//             cpbDto.selectedOptions = cp.selectedOptions;

//             await this.cpRepository.couponBets.create(cpbDto);
//           }

//           return coupon;
//         }
//       }
//     } catch (error) {
//       this.logger.error(error.message, 'ERROR::couponservice.add');
//       throw error;
//     }
//   }

//   async edit(data: UpdateCouponDTO): Promise<Coupon> {
//     try {
//       const { id } = data;
//       const coupons = id && (await this.couponsRepository.coupons.findOne({
//         where: { id: id },
//         relations: { user: true, couponBets: true }
//       }));
//       if (coupons) {
//         return await this.couponsRepository.coupons.update(
//           CouponFactory.update(coupons, data),
//         );
//       }
//       throw new NotFoundException();
//     } catch (error) {
//       this.logger.error(error.message, 'ERROR::couponservice.editcoupons');

//       throw error;
//     }
//   }

//   async setState(id: string): Promise<boolean> {
//     return false;
//   }

//   async remove(id: string): Promise<boolean> {
//     try {
//       const coupons = await this.couponsRepository.coupons.findOne({
//         where: { id: id },
//         relations: { user: true, couponBets: true }
//       });
//       if (coupons) {
//         return await this.couponsRepository.coupons.remove(coupons).then(() => true);
//       }
//       return false;
//     } catch (error) {
//       this.logger.error(error.message, 'ERROR::couponservice.remove');
//       return false;
//     }
//   }

//   // coupon suiie
//   // Nouvelle fonction pour vérifier les coupons avec les scores/états mis à jour
//   async checkCoupons(data: UpdateMatchDTO): Promise<any> {
//     // 1. Récupérer tous les coupons actifs
//     const {id} = data;
//     const match = await this.matchRepository.matchs.findOneByID(id);
//     console.log("-----------------------------------------------------------", match);
//     const coupons = await this.getActiveCoupons();

//     if (!match) {
//       throw new NotFoundException('Match not found');
//     }

//     // 2. Vérifier chaque coupon pour voir s'il contient des paris pour ce match
//     for (const coupon of coupons) {
//       console.log(coupon);

//       const relevantBets = coupon.couponBets.filter((couponBet) => {
//         console.log("------*******", couponBet.bet);

//         if (!couponBet.bet || !couponBet.bet.match) {
//           console.error(`Bet ${couponBet.bet?.id} does not have a match associated.`);
//           return false; // Ignorer les paris sans match
//         }
//         return couponBet.bet.match.id === match.id; // Comparer les IDs
//       });


//       // 3. Vérifier si les paris correspondent aux scores/événements du match
//       for (const bet of relevantBets) {
//         if (this.isBetWinning(bet, match)) {
//           this.logger.log(`Bet ${bet.id} a gagné`);
//           bet.status = BetStatus.GAGNE;
//           await this.updateBetStatus(bet, BetStatus.GAGNE);
//         } else {
//           this.logger.log(`Bet ${bet.id} a perdu`);
//           bet.status = BetStatus.PERDU;
//           await this.updateBetStatus(bet, BetStatus.PERDU);
//         }
//       }

//       // 4. Appeler la méthode pour mettre à jour le statut global du coupon
//       await this.updateCouponStatus(coupon);
//     }
//   }


//   private isBetWinning(cb: CouponBet, match: Match): boolean {
//     const key = Object.keys(cb.selectedOptions)[0];
//     console.log("--------------------------------", key);


//     switch (cb.bet.category) {
//       case CategoryName.VICTOIRE:
//         // Vérifier si le match est terminé avant de valider le pari
//         if (match.etat !== MatchState.TERMINER) {
//           return false; // Si le match n'est pas terminé, on ne peut pas vérifier ce pari
//         }
//         if (key === 'V1' && match.scores.home > match.scores.away) return true;
//         if (key === 'V2' && match.scores.away > match.scores.home) return true;
//         if (key === 'X' && match.scores.home === match.scores.away) return true;
//         break;

//       case CategoryName.DEUX_MARQUENT:
//         return match.scores.home > 0 && match.scores.away > 0;

//       case CategoryName.CARTON_ROUGE:
//         return match.events.some((event) => event.type === 'CARTON_ROUGE');

//       // Tu peux ajouter d'autres catégories ici, par exemple pour les cartons jaunes
//       // case CategoryName.CARTON_JAUNE:
//       //   return match.events.filter((event) => event.type === 'CARTON_JAUNE').length >= cb.selectedOptions['cartonsJaunes'];

//       default:
//         return false;
//     }

//     return false;
//   }


//   // Mettre à jour le statut d'un pari
//   private async updateBetStatus(couponBet: CouponBet, status: BetStatus) {
//     // Logique pour mettre à jour le statut du pari dans la base de données
//     this.logger.log(`Mise à jour du statut du pari`);
//     couponBet.status = status;
//     const cb = await this.cpRepository.couponBets.update(couponBet);
//     return cb;
//   }

//   // private async updateBetStatus(couponBet: CouponBet, status: BetStatus) {
//   //   await this.connection.transaction(async (manager) => {
//   //     couponBet.status = status;
//   //     await manager.save(CouponBet, couponBet); // Utiliser le manager pour la transaction
//   //     this.logger.log(`Mise à jour du statut du pari ${couponBet.id} à ${status}`);
//   //   });
//   // }
//   // Fonction pour récupérer tous les coupons actifs
//   private async getActiveCoupons(): Promise<Coupon[]> {
//     try {
//       const coupons = await this.couponsRepository.coupons.find({
//         where: { etat: CouponState.PENDING },
//         relations: { 
//           couponBets: {
//             bet: {
//               match: true, // Récupérer le match lié au bet
//             },
//           }, 
//           user: true,
//         }
//       });
//       return coupons;
//     } catch (error) {
//       this.logger.error(error.message, 'ERROR::couponsService.fetchAllActive');
//       throw error;
//     }
//   }

//   // 
//   private async updateCouponStatus(coupon: Coupon) {
//     const allBetsWon = coupon.couponBets.every(bet => bet.status === BetStatus.GAGNE);
//     const anyBetLost = coupon.couponBets.some(bet => bet.status === BetStatus.PERDU);

//     const user = await this.userRepository.users.findOneByID(coupon.user.id);
//     if (!user) {
//       throw new NotFoundException('User not found');
//     }

//     if (allBetsWon) {
//       coupon.etat = CouponState.WIN;
//       user.solde += coupon.gains;
//     } else if (anyBetLost) {
//       coupon.etat = CouponState.LOOSE;
//     } else {
//       coupon.etat = CouponState.PENDING;
//     }

//     const cp = await this.couponsRepository.coupons.update(coupon);
//     await this.userRepository.users.update(user);
//     return cp;
//   }


//   async validatePendingCoupons(): Promise<void> {
//     // 1. Récupérer tous les coupons avec un état 'PENDING'
//     const coupons = await this.getActiveCoupons();

//     // 2. Pour chaque coupon, vérifier les paris associés
//     for (const coupon of coupons) {
//         let couponUpdated = false; // Indicateur pour savoir si le statut du coupon a changé

//         for (const couponBet of coupon.couponBets) {
//             const match = couponBet.bet.match;

//             // 3. Vérifier si le pari peut être validé en temps réel (par exemple, les deux équipes marquent)
//             if (this.canBetBeValidatedEarly(couponBet, match)) {
//                 if (this.isBetWinning(couponBet, match)) {
//                     this.logger.log(`Bet ${couponBet.id} a gagné (validation en temps réel)`);
//                     await this.updateBetStatus(couponBet, BetStatus.GAGNE);
//                 } else {
//                     this.logger.log(`Bet ${couponBet.id} a perdu`);
//                     await this.updateBetStatus(couponBet, BetStatus.PERDU);
//                 }
//                 couponUpdated = true; // Le coupon a été mis à jour
//                 continue; // Passer à la prochaine vérification de pari
//             }

//             // 4. Si le match n'est pas terminé, continuer avec le prochain pari
//             if (match.etat !== MatchState.TERMINER) {
//                 continue; // On ne peut pas valider le pari tant que le match n'est pas terminé
//             }

//             // 5. Vérifier le pari une fois le match terminé
//             if (this.isBetWinning(couponBet, match)) {
//                 this.logger.log(`Bet ${couponBet.id} a gagné`);
//                 await this.updateBetStatus(couponBet, BetStatus.GAGNE);
//             } else {
//                 this.logger.log(`Bet ${couponBet.id} a perdu`);
//                 await this.updateBetStatus(couponBet, BetStatus.PERDU);
//             }
//             couponUpdated = true; // Le coupon a été mis à jour
//         }

//         // 6. Si un ou plusieurs paris ont été mis à jour, mettre à jour le statut global du coupon
//         if (couponUpdated) {
//             await this.updateCouponStatus(coupon);
//         }
//     }
//   }


//   private canBetBeValidatedEarly(couponBet: CouponBet, match: Match): boolean {
//     const key = Object.keys(couponBet.selectedOptions)[0];

//     switch (couponBet.bet.category) {
//         case CategoryName.DEUX_MARQUENT:
//             // Si les deux équipes ont déjà marqué, on peut valider ce pari
//             return match.scores.home > 0 && match.scores.away > 0;

//         case CategoryName.CARTON_ROUGE:
//             // Si un carton rouge a été donné, on peut valider ce pari immédiatement
//             return match.events.some((event) => event.type === 'CARTON_ROUGE');

//         // Tu peux ajouter d'autres types de paris ici qui peuvent être validés en temps réel

//         default:
//             return false; // Si ce pari ne peut pas être validé en temps réel, on retourne false
//     }
//   }
// }



import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Coupon, CouponState } from '../../../coupon/domain';
import { CouponAccountDto, UpdateCouponDTO } from '../dto';
import { ICouponRepository } from '../../../coupon/domain/data.abstract';
import { IUserRepository } from '../../../user/domain';
import { CouponFactory } from '../coupon.factory';
import { IBetRepository } from '../../../bet/domain/data.abstract';
import { ICouponBetRepository } from '../../../couponBet/domain/data.abstract';
import { BetStatus, CouponBet } from '../../../couponBet/domain';

@Injectable()
export class CouponService {
  private readonly logger = new Logger();

  constructor(
    private couponsRepository: ICouponRepository,
    private userRepository: IUserRepository,
    private betRepository: IBetRepository,
    private cpRepository: ICouponBetRepository,
  ) { }

  // Récupérer tous les coupons avec relations
  async fetchAll(): Promise<Coupon[]> {
    return await this.couponsRepository.coupons.find({
      relations: {
        user: true,
        couponBets: {
          bet: { match: true },
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async fetchOne(id: string): Promise<Coupon> {
    const coupon = await this.couponsRepository.coupons.findOne({
      where: { id },
      relations: {
        user: true,
        couponBets: { bet: { match: true } },
      },
    });
    if (!coupon) throw new NotFoundException('Coupon non trouvé');
    return coupon;
  }

  // Ajouter un coupon avec ses CouponBets
  async add(data: CouponAccountDto): Promise<Coupon> {
    const { amount, user, couponBets } = data;

    const userExisted = await this.userRepository.users.findOneByID(user);
    if (!userExisted) throw new NotFoundException('Utilisateur non trouvé');

    if (amount < 100 || amount > 100000)
      throw new BadRequestException('Mise invalide (100 à 100000)');

    if (amount > userExisted.solde)
      throw new BadRequestException('Solde insuffisant');

    let totalOdds = 1;

    // Vérification des bets et calcul des cotes
    const betsEntities: CouponBet[] = [];
    for (const cp of couponBets) {
      // @ts-ignore
      const betId = typeof cp.bet === 'string' ? cp.bet : cp.bet.id;
      const betExisted = await this.betRepository.bets.findOneByID(betId);
      if (!betExisted) throw new NotFoundException('Bet non trouvé');

      // Vérification des options sélectionnées
      for (const key of Object.keys(cp.selectedOptions)) {
        if (!(key in betExisted.odds))
          throw new BadRequestException(`Option ${key} invalide pour ce bet`);
      }

      const selectedOdds = Object.values(cp.selectedOptions)[0]; // Prendre la première sélection
      totalOdds *= selectedOdds;

      betsEntities.push({
        ...cp,
        bet: betExisted,
        status: BetStatus.PENDING,
      } as CouponBet);
    }

    const gains = totalOdds * amount;

    // Débiter le solde utilisateur
    userExisted.solde -= amount;
    await this.userRepository.users.update(userExisted);

    // Création du coupon
    const couponEntity = await this.couponsRepository.coupons.create(
      await CouponFactory.create({ ...data, totalOdds, gains }, userExisted),
    );

    // Création des CouponBets
    for (const cp of betsEntities) {
      cp.coupon = couponEntity;
      await this.cpRepository.couponBets.create(cp);
    }

    return couponEntity;
  }

  // Modifier un coupon
  async edit(data: UpdateCouponDTO): Promise<Coupon> {
    const coupon = await this.couponsRepository.coupons.findOne({
      where: { id: data.id },
      relations: { user: true, couponBets: true },
    });
    if (!coupon) throw new NotFoundException();

    return await this.couponsRepository.coupons.update(
      CouponFactory.update(coupon, data),
    );
  }


  // Récupérer tous les coupons avec relations
  async getPendingCoupons(): Promise<Coupon[]> {
    return await this.couponsRepository.coupons.find({
      where: { etat: CouponState.PENDING },
      relations: {
        user: true,
        couponBets: {
          bet: { match: true },
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  // Récupérer tous les coupons en attente pour un match spécifique
  // async getMatchPendingCoupons(matchId: string): Promise<Coupon[]> {
  //   try {
  //     // Vérifier si le match existe
  //     const match = await this.matchRepository.matchs.findOne({
  //       where: { id: matchId },
  //     });

  //     if (!match) {
  //       throw new NotFoundException('Match non trouvé');
  //     }

  //     // Récupérer les coupons en attente pour ce match
  //     const coupons = await this.couponsRepository.coupons.find({
  //       where: {
  //         etat: CouponState.PENDING,
  //         match: { id: matchId },
  //       },
  //       relations: {
  //         user: true,
  //         couponBets: {
  //           bet: {
  //             match: true
  //           }
  //         }
  //       },
  //       order: { createdAt: 'DESC' },
  //     });

  //     return coupons;

  //   } catch (error) {
  //     // Log l'erreur pour le débogage
  //     this.logger.error(
  //       `Erreur lors de la récupération des coupons en attente pour le match ${matchId}: ${error.message}`,
  //       error.stack
  //     );

  //     // Relancer l'erreur ou retourner un tableau vide selon votre logique métier
  //     throw error;

  //     // Alternative: retourner un tableau vide en cas d'erreur
  //     // return [];
  //   }
  // }

  // Vérification et mise à jour en temps réel des coupons
  // async validatePendingCoupons(): Promise<void> {
  //   const coupons = await this.couponsRepository.coupons.find({
  //     where: { etat: CouponState.PENDING },
  //     relations: { couponBets: { bet: { match: true } }, user: true },
  //   });

  //   for (const coupon of coupons) {
  //     let couponUpdated = false;

  //     for (const cb of coupon.couponBets) {
  //       const match = cb.bet.match;
  //       if (!match) continue;

  //       // Validation en temps réel si possible
  //       if (this.canBetBeValidatedEarly(cb, match)) {
  //         cb.status = this.isBetWinning(cb, match) ? BetStatus.GAGNE : BetStatus.PERDU;
  //         await this.cpRepository.couponBets.update(cb);
  //         couponUpdated = true;
  //         continue;
  //       }

  //       if (match.etat === MatchState.TERMINER) {
  //         cb.status = this.isBetWinning(cb, match) ? BetStatus.GAGNE : BetStatus.PERDU;
  //         await this.cpRepository.couponBets.update(cb);
  //         couponUpdated = true;
  //       }
  //     }

  //     if (couponUpdated) {
  //       await this.updateCouponStatus(coupon);
  //     }
  //   }
  // }

  // private canBetBeValidatedEarly(cb: CouponBet, match: Match): boolean {
  //   switch (cb.bet.category) {
  //     case CategoryName.DEUX_MARQUENT:
  //       return match.scores.home > 0 && match.scores.away > 0;
  //     case CategoryName.CARTON_ROUGE:
  //       return match.events.some((e) => e.type === 'CARTON_ROUGE');
  //     default:
  //       return false;
  //   }
  // }

  // private isBetWinning(cb: CouponBet, match: Match): boolean {
  //   const key = Object.keys(cb.selectedOptions)[0];

  //   switch (cb.bet.category) {
  //     case CategoryName.VICTOIRE:
  //       if (match.etat !== MatchState.TERMINER) return false;
  //       if (key === 'V1') return match.scores.home > match.scores.away;
  //       if (key === 'V2') return match.scores.away > match.scores.home;
  //       if (key === 'X') return match.scores.home === match.scores.away;
  //       break;

  //     case CategoryName.DEUX_MARQUENT:
  //       return match.scores.home > 0 && match.scores.away > 0;

  //     case CategoryName.CARTON_ROUGE:
  //       return match.events.some((e) => e.type === 'CARTON_ROUGE');

  //     default:
  //       return false;
  //   }

  //   return false;
  // }

  // private async updateCouponStatus(coupon: Coupon) {
  //   const allBetsWon = coupon.couponBets.every((b) => b.status === BetStatus.GAGNE);
  //   const anyBetLost = coupon.couponBets.some((b) => b.status === BetStatus.PERDU);

  //   const user = await this.userRepository.users.findOneByID(coupon.user.id);
  //   if (!user) throw new NotFoundException('User not found');

  //   if (allBetsWon) {
  //     coupon.etat = CouponState.WIN;
  //     user.solde += coupon.gains;
  //   } else if (anyBetLost) {
  //     coupon.etat = CouponState.LOOSE;
  //   } else {
  //     coupon.etat = CouponState.PENDING;
  //   }

  //   await this.couponsRepository.coupons.update(coupon);
  //   await this.userRepository.users.update(user);
  // }
}
