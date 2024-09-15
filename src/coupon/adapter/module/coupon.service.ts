import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ICouponService } from 'src/coupon/app/module';
import { Coupon, CouponState } from 'src/coupon/domain';
import { CouponAccountDto, UpdateCouponDTO } from '../dto';
import { ICouponRepository } from 'src/coupon/domain/data.abstract';
import { IUserRepository } from 'user/domain';
import { CouponFactory } from '../coupon.factory';
import { IBetRepository } from 'src/bet/domain/data.abstract';
import { ICouponBetRepository } from 'src/couponBet/domain/data.abstract';
import { BetStatus, CouponBet } from 'src/couponBet/domain';
import { MatchGateway } from 'src/match/adapter/module/match.gateway';
import { Match, MatchState } from 'src/match/domain';
import { Connection } from 'typeorm';
import { CategoryName } from 'src/bet/domain';

@Injectable()
export class CouponService implements ICouponService {
  private readonly logger = new Logger();
  constructor(
    private readonly connection: Connection, 
    private couponsRepository: ICouponRepository,
    private userRepository: IUserRepository,
    private betRepository: IBetRepository,
    private cpRepository: ICouponBetRepository,
    // 
    @Inject(forwardRef(() => MatchGateway)) // Injection du Gateway
    private readonly matchGateway: MatchGateway,
  ) {
    // Écouter les mises à jour des scores
    this.matchGateway.server.on('scoreUpdated', (match) => {
      this.logger.log(`Score mis à jour pour le match ${match.id}`);
      this.checkCoupons(match); // Vérifier les coupons quand le score est mis à jour
    });

    // Écouter les mises à jour de l'état du match (par exemple : match terminé)
    this.matchGateway.server.on('stateUpdated', (match) => {
      this.logger.log(`État mis à jour pour le match ${match.id}`);
      this.checkCoupons(match); // Vérifier les coupons quand l'état est mis à jour
    });
  }

  async fetchAll(): Promise<Coupon[]> {
    try {
      return await this.couponsRepository.coupons.find({
        relations: { user: true, couponBets: true }
      });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::couponsService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Coupon> {
    try {
      const coupons = await this.couponsRepository.coupons.findOne({
        where: { id: id },
        relations: { user: true, couponBets: true }
      });
      if (coupons) {
        return coupons;
      }
      throw new NotFoundException('coupons not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::couponsService.fetchOne');
      throw error;
    }
  }

  async search(data: Partial<Coupon>): Promise<Coupon> {
    return await this.couponsRepository.coupons.findOneBy({ ...data });
  }

  async add(data: CouponAccountDto): Promise<Coupon> {
    try {
      const { amount, user, couponBets } = data;

      const userExisted = await this.userRepository.users.findOneByID(user);
      if(!userExisted) throw new NotFoundException("Utilisateur non trouvé");

      let totalOdds = 1;

      // Vérification et calcul des cotes
      for(const cp of couponBets) {
        const betExisted = await this.betRepository.bets.findOneByID(cp.id);
        if (!betExisted) {
          throw new NotFoundException(`Bet non trouvé`);
        }

        // Calcul des cotes en fonction des options sélectionnées
        const selectedOdds = cp.selectedOptions[Object.keys(cp.selectedOptions)[0]];
        totalOdds *= selectedOdds;
      }

      // Calcul des gains
      const gains = totalOdds * amount;

      if (amount < 100) {
        throw new BadRequestException("Une mise minimum de 100frs");
      } else if (amount > 100000) {
        throw new BadRequestException("La mise ne doit pas dépassée 100000frs");
      } else {
        if (amount > userExisted.solde) {
          throw new BadRequestException("Votre solde est insuffisant veuillez le recharger");
        } else {
          userExisted.solde -= amount;

          // Mise à jour du DTO avec les nouveaux calculs
          const couponData = {
            ...data,
            totalOdds: totalOdds, // On met à jour les cotes
            gains: gains,         // On met à jour les gains
          };

          const coupon = await this.couponsRepository.coupons.create(
            await CouponFactory.create(couponData, userExisted),
          );
          await this.userRepository.users.update(userExisted);

          // Création des CouponBets
          for (const cp of couponBets) {
            const cpbDto = new CouponBet();
            cpbDto.coupon = coupon;
            cpbDto.bet = cp.bet;
            cpbDto.selectedOptions = cp.selectedOptions;

            await this.cpRepository.couponBets.create(cpbDto);
          }

          return coupon;
        }
      }
    } catch (error) {
      this.logger.error(error.message, 'ERROR::couponservice.add');
      throw error;
    }
}


  // async add(data: CouponAccountDto): Promise<Coupon> {
  //   try {
  //     const { amount, user, couponBets } = data;
      

  //     const userExisted = await this.userRepository.users.findOneByID(user);
  //     if(!userExisted) throw new NotFoundException("Utilisateur non trouvé");


  //     for(const cp of couponBets) {
  //       const betsExisted = await this.betRepository.bets.findOneByID(cp.id);
  //       if (!betsExisted) {
  //         throw new NotFoundException(`Bet non trouvé`);
  //       }

  //       if(amount < 100) {
  //         throw new BadRequestException("Une mise minimum de 100frs")
  //       } else if(amount > 100000) {
  //         throw new BadRequestException("La mise ne doit pas dépassée 100000frs")
  //       } else {
  //         if (amount > userExisted.solde) {
  //           throw new BadRequestException("Votre solde est insuffisant veuillez le recharger")
  //         } else {
  //           userExisted.solde -= amount;
  
  //           const coupon = await this.couponsRepository.coupons.create(
  //             await CouponFactory.create(data, userExisted,),
  //           );
  //           await this.userRepository.users.update(userExisted);

  //           // Création des CouponBets en leur attribuant l'ID du coupon
  //           for (const cp of couponBets) {
  //             const cpbDto = new CouponBet();
  //             cpbDto.coupon = coupon; // On associe l'ID du coupon
  //             cpbDto.bet = cp.bet; // On garde le lien avec le bet
  //             cpbDto.selectedOptions = cp.selectedOptions;

  //             // Création de chaque CouponBet avec l'ID du coupon
  //             await this.cpRepository.couponBets.create(cpbDto);
  //           }
  //           // const cpbDto = new CouponBetAccountDto();
  //           // cpbDto.coupon = coupon.id;
  //           // await this.cpRepository.couponBets.createMany(couponBets)
  //           return coupon;
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     this.logger.error(error.message, 'ERROR::couponservice.add');
  //     throw error;
  //   }
  // }

  async edit(data: UpdateCouponDTO): Promise<Coupon> {
    try {
      const { id } = data;
      const coupons = id && (await this.couponsRepository.coupons.findOne({
        where: { id: id },
        relations: { user: true, couponBets: true }
      }));
      if (coupons) {
        return await this.couponsRepository.coupons.update(
          CouponFactory.update(coupons, data),
        );
      }
      throw new NotFoundException();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::couponservice.editcoupons');

      throw error;
    }
  }

  async setState(id: string): Promise<boolean> {
    return false;
  }

  async remove(id: string): Promise<boolean> {
    try {
      const coupons = await this.couponsRepository.coupons.findOne({
        where: { id: id },
        relations: { user: true, couponBets: true }
      });
      if (coupons) {
        return await this.couponsRepository.coupons.remove(coupons).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::couponservice.remove');
      return false;
    }
  }

  // coupon suiie
  // Nouvelle fonction pour vérifier les coupons avec les scores/états mis à jour
  private async checkCoupons(match: Match) {
    // 1. Récupérer tous les coupons actifs
    console.log("-----------------------------------------------------------");
    
    const coupons = await this.getActiveCoupons();
  
    // 2. Vérifier chaque coupon pour voir s'il contient des paris pour ce match
    for (const coupon of coupons) {
      const relevantBets = coupon.couponBets.filter((couponBet) => couponBet.bet.match === match);
  
      // 3. Vérifier si les paris correspondent aux scores/événements du match
      for (const bet of relevantBets) {
        if (this.isBetWinning(bet, match)) {
          this.logger.log(`Bet ${bet.id} a gagné`);
          bet.status = BetStatus.GAGNE;
          await this.updateBetStatus(bet, BetStatus.GAGNE);
        } else {
          this.logger.log(`Bet ${bet.id} a perdu`);
          bet.status = BetStatus.PERDU;
          await this.updateBetStatus(bet, BetStatus.PERDU);
        }
      }
  
      // 4. Appeler la méthode pour mettre à jour le statut global du coupon
      await this.updateCouponStatus(coupon);
    }
  }
  

  private isBetWinning(cb: CouponBet, match: Match): boolean {
    const key = Object.keys(cb.selectedOptions)[0];
    console.log("--------------------------------", key);
    
  
    switch (cb.bet.category) {
      case CategoryName.VICTOIRE:
        // Vérifier si le match est terminé avant de valider le pari
        if (match.etat !== MatchState.TERMINER) {
          return false; // Si le match n'est pas terminé, on ne peut pas vérifier ce pari
        }
        if (key === 'V1' && match.scores.home > match.scores.away) return true;
        if (key === 'V2' && match.scores.away > match.scores.home) return true;
        if (key === 'X' && match.scores.home === match.scores.away) return true;
        break;
  
      case CategoryName.DEUX_MARQUENT:
        return match.scores.home > 0 && match.scores.away > 0;
  
      case CategoryName.CARTON_ROUGE:
        return match.events.some((event) => event.type === 'CARTON_ROUGE');
  
      // Tu peux ajouter d'autres catégories ici, par exemple pour les cartons jaunes
      // case CategoryName.CARTON_JAUNE:
      //   return match.events.filter((event) => event.type === 'CARTON_JAUNE').length >= cb.selectedOptions['cartonsJaunes'];
  
      default:
        return false;
    }
  
    return false;
  }
  

  // Mettre à jour le statut d'un pari
  private async updateBetStatus(couponBet: CouponBet, status: BetStatus) {
    // Logique pour mettre à jour le statut du pari dans la base de données
    this.logger.log(`Mise à jour du statut du pari`);
    couponBet.status = status;
    await this.cpRepository.couponBets.update(couponBet);
  }

  // private async updateBetStatus(couponBet: CouponBet, status: BetStatus) {
  //   await this.connection.transaction(async (manager) => {
  //     couponBet.status = status;
  //     await manager.save(CouponBet, couponBet); // Utiliser le manager pour la transaction
  //     this.logger.log(`Mise à jour du statut du pari ${couponBet.id} à ${status}`);
  //   });
  // }
  // Fonction pour récupérer tous les coupons actifs
  private async getActiveCoupons(): Promise<Coupon[]> {
    try {
      const coupons = await this.couponsRepository.coupons.find({
        where: { etat: CouponState.PENDING },
        relations: { couponBets: true, user: true, }
      });
      return coupons;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::couponsService.fetchAllActive');
      throw error;
    }
  }

  // 
  private async updateCouponStatus(coupon: Coupon) {
    const allBetsWon = coupon.couponBets.every(bet => bet.status === BetStatus.GAGNE);
    const anyBetLost = coupon.couponBets.some(bet => bet.status === BetStatus.PERDU);
  
    if (allBetsWon) {
      coupon.etat = CouponState.WIN;
    } else if (anyBetLost) {
      coupon.etat = CouponState.LOOSE;
    } else {
      coupon.etat = CouponState.PENDING;
    }
  
    await this.couponsRepository.coupons.update(coupon);
  }
  

}
