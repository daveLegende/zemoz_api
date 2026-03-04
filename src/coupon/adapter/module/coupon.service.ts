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
