
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TournoiCouponAccountDto, UpdateTournoiCouponDTO } from '../dto';
import { IUserRepository } from '../../../user/domain';
import { TournoiCouponFactory } from '../tournoi_coupon.factory';
import { IBetRepository } from '../../../bet/domain/data.abstract';
import { BetStatus } from '../../../couponBet/domain';
import { CategoryName } from '../../../bet/domain';
import { TournoiCoupon, TournoiCouponState } from '../../../tournoiCoupon/domain';
import { ITournoiCouponRepository } from '../../../tournoiCoupon/domain/data.abstract';
import { ITournoiCouponBetRepository, TournoiCouponBet } from '../../../tournoiCouponBet/domain';
import { ITournoiCouponService } from '../../../tournoiCoupon/app/module';
import { IMatchRepository, MatchType } from '../../../match/domain';
import { IPlayerRepository } from '../../../player/domain';
import { TournoiCouponEntity } from '../../../tournoiCoupon/framework/schema/tournoi_coupon.entity';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../../user/framework/database/schema/user.entity';

import { TournoiCouponGateway } from './tournoi_coupon.gateway';
import { PaginationOptionsDto } from '../../../_shared/adapter/dto/pagination-options.dto';
import { PaginationResultDto } from '../../../_shared/adapter/dto/pagination-result.dto';

@Injectable()
export class TournoiCouponService implements ITournoiCouponService {
  private readonly logger = new Logger();

  constructor(
    private tournoiCouponsRepository: ITournoiCouponRepository,
    private userRepository: IUserRepository,
    private betRepository: IBetRepository,
    private tcpRepository: ITournoiCouponBetRepository,
    private matchRepository: IMatchRepository,
    private playerRepository: IPlayerRepository,
    private dataSource: DataSource,
    private tournoiCouponGateway: TournoiCouponGateway,
  ) { }



  validatePendingCoupons(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // Récupérer tous les coupons avec relations
  async fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<TournoiCoupon>> {
    const [coupons, total] = await this.tournoiCouponsRepository.tournoiCoupons.findAndCount({
      skip: options.skip,
      take: options.limit,
      relations: {
        user: true,
        tournoiCouponBets: {
          bet: { match: true, competition: true },
        },
      },
      order: { createdAt: 'DESC' },
    });
    return new PaginationResultDto(coupons, total, options.page, options.limit);
  }

  async fetchOne(id: string): Promise<TournoiCoupon> {
    const coupon = await this.tournoiCouponsRepository.tournoiCoupons.findOne({
      where: { id },
      relations: {
        user: true,
        tournoiCouponBets: { bet: { match: true, competition: true } },
      },
    });
    if (!coupon) throw new NotFoundException('Coupon non trouvé');
    return coupon;
  }

  /* ================= SEARCH ================= */
  async search(data: Partial<TournoiCoupon>): Promise<TournoiCoupon> {
    return await this.tournoiCouponsRepository.tournoiCoupons.findOneBy(data);
  }

  // Ajouter un coupon avec ses CouponBets
  async add(data: TournoiCouponAccountDto): Promise<TournoiCoupon> {
    const { amount, user, tournoiCouponBets } = data;

    const userExisted = await this.userRepository.users.findOneByID(user);
    if (!userExisted) throw new NotFoundException('Utilisateur non trouvé');

    if (amount < 100 || amount > 100000)
      throw new BadRequestException('Mise invalide (100 à 100000)');

    if (amount > userExisted.solde)
      throw new BadRequestException('Solde insuffisant');

    let totalOdds = 1;

    // Vérification des bets et calcul des cotes
    const betsEntities: TournoiCouponBet[] = [];
    for (const cp of tournoiCouponBets) {
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
      } as TournoiCouponBet);
    }

    const gains = totalOdds * amount;

    // Débiter le solde utilisateur
    userExisted.solde -= amount;
    await this.userRepository.users.update(userExisted);

    // Création du coupon
    const tournoiCouponEntity = await this.tournoiCouponsRepository.tournoiCoupons.create(
      await TournoiCouponFactory.create({ ...data, totalOdds, gains } as any, userExisted),
    );

    // Création des CouponBets
    for (const cp of betsEntities) {
      cp.tournoiCoupon = tournoiCouponEntity;
      await this.tcpRepository.tournoiCouponBets.create(cp);
    }

    return tournoiCouponEntity;
  }

  // Modifier un coupon
  async edit(data: UpdateTournoiCouponDTO): Promise<TournoiCoupon> {
    const coupon = await this.tournoiCouponsRepository.tournoiCoupons.findOne({
      where: { id: data.id },
      relations: { user: true, tournoiCouponBets: true },
    });
    if (!coupon) throw new NotFoundException();

    return await this.tournoiCouponsRepository.tournoiCoupons.update(
      TournoiCouponFactory.update(coupon, data),
    );
  }


  // Récupérer tous les coupons avec relations
  async getPendingCoupons(): Promise<TournoiCoupon[]> {
    return await this.tournoiCouponsRepository.tournoiCoupons.find({
      where: { etat: TournoiCouponState.PENDING },
      relations: {
        user: true,
        tournoiCouponBets: {
          bet: { match: true, competition: true },
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  /* ================= SET STATE ================= */
  async setState(id: string): Promise<boolean> {
    // Implement logic to set state manually if needed, or return false
    return false;
  }

  /* ================= REMOVE ================= */
  async remove(id: string): Promise<boolean> {
    const coupon = await this.tournoiCouponsRepository.tournoiCoupons.findOne({ where: { id } });
    if (!coupon) return false;
    await this.tournoiCouponsRepository.tournoiCoupons.remove(coupon);
    return true;
  }

  // async checkCoupons(): Promise<void> {
  //   const pendingCoupons = await this.tournoiCouponsRepository.tournoiCoupons.find({
  //     where: { etat: TournoiCouponState.PENDING },
  //     relations: {
  //       tournoiCouponBets: { bet: true },
  //       user: true,
  //     },
  //   });

  //   // WINNER
  //   const finalMatch = await this.matchRepository.matchs.findOne({
  //     where: { type: MatchType.FINALE },
  //     relations: { home: true, away: true },
  //   });

  //   if (!finalMatch) return;

  //   const winnerTeam = (finalMatch.homePenalty !== null && finalMatch.awayPenalty !== null && 
  //                     (finalMatch.homePenalty > 0 || finalMatch.awayPenalty > 0 || 
  //                       finalMatch.homePenalty !== finalMatch.awayPenalty))
  //     ? finalMatch.homePenalty > finalMatch.awayPenalty
  //       ? finalMatch.home.id
  //       : finalMatch.away.id
  //     : finalMatch.scores.home > finalMatch.scores.away
  //       ? finalMatch.home.id
  //       : finalMatch.away.id;

  //   // Meilleur buteur
  //   const topScorer = await this.playerRepository.players.findOne({
  //     order: { buts: 'DESC' },
  //   });

  //   // Meilleur passeur
  //   const topAssist = await this.playerRepository.players.findOne({
  //     order: { passes: 'DESC' },
  //   });

  //   for (const coupon of pendingCoupons) {
  //     await this.dataSource.transaction(
  //       async (manager) => {
  //         // Recharger le coupon avec verrouillage
  //         const lockedCoupon = await manager.findOne(TournoiCouponEntity, {
  //           where: { id: coupon.id },
  //           relations: {
  //             tournoiCouponBets: { bet: true },
  //             user: true,
  //           },
  //           lock: { mode: 'pessimistic_write' },
  //         });

  //         if (!lockedCoupon) return;

  //         //  Sécurité anti double paiement
  //         if (lockedCoupon.isPaid || lockedCoupon.etat !== TournoiCouponState.PENDING) {
  //           return;
  //         }

  //         let hasLost = false;
  //         let hasPending = false;

  //         for (const couponBet of lockedCoupon.tournoiCouponBets) {
  //           const bet = couponBet.bet;
  //           const selected = Object.keys(couponBet.selectedOptions)[0];

  //           let resultValue: string | null = null;

  //           switch (bet.category) {
  //             case CategoryName.COMPETITION_WINNER:
  //               resultValue = winnerTeam;
  //               break;

  //             case CategoryName.COMPETITION_TOP_SCORER:
  //               resultValue = topScorer?.id;
  //               break;

  //             case CategoryName.COMPETITION_TOP_ASSIST:
  //               resultValue = topAssist?.id;
  //               break;
  //           }

  //           // Si résultat pas encore disponible → PENDING
  //           if (!resultValue) {
  //             hasPending = true;
  //             continue;
  //           }

  //           if (selected === resultValue) {
  //             couponBet.status = BetStatus.GAGNE;
  //           } else {
  //             couponBet.status = BetStatus.PERDU;
  //             hasLost = true;
  //           }

  //           await manager.save(couponBet);
  //         }

  //         // Décision finale du coupon
  //         if (hasLost) {
  //           lockedCoupon.etat = TournoiCouponState.LOOSE;
  //         } 
  //         else if (!hasPending) {
  //           lockedCoupon.etat = TournoiCouponState.WIN;

  //           // Paiement unique garanti
  //           if (!lockedCoupon.isPaid) {
  //             lockedCoupon.user.solde += lockedCoupon.gains;
  //             lockedCoupon.isPaid = true;

  //             await manager.save(lockedCoupon.user);
  //           }
  //         }

  //         await manager.save(lockedCoupon);
  //       },
  //     );
  //   }
  // }

  async checkCoupons(): Promise<{ 
    success: boolean; 
    message: string; 
    processedCount: number;
    winnersCount: number;
    losersCount: number;
    paidCount: number;
  }> {
    const pendingCoupons = await this.tournoiCouponsRepository.tournoiCoupons.find({
      where: { etat: TournoiCouponState.PENDING },
      relations: {
        tournoiCouponBets: { bet: true },
        user: true,
      },
    });

    // WINNER
    let finalMatch;
    try {
      finalMatch = await this.matchRepository.matchs.findOne({
        where: { type: MatchType.FINALE },
        relations: { home: true, away: true },
      });
    } catch (err) {
      this.logger.error(`Erreur lors de la recherche de la finale: ${err.message}`);
      throw err;
    }

    if (!finalMatch) {
      this.logger.warn('Finale non trouvée, arrêt de checkCoupons');
      return {
        success: false,
        message: 'Finale non trouvée',
        processedCount: 0,
        winnersCount: 0,
        losersCount: 0,
        paidCount: 0,
      };
    }

    let winnerTeam: string;
    try {
      const homeScore = finalMatch.scores?.home ?? 0;
      const awayScore = finalMatch.scores?.away ?? 0;
      const homePenalty = finalMatch.homePenalty ?? 0;
      const awayPenalty = finalMatch.awayPenalty ?? 0;

      const isPenalties = (finalMatch.homePenalty !== null && finalMatch.awayPenalty !== null && 
                          (homePenalty > 0 || awayPenalty > 0 || homePenalty !== awayPenalty));

      if (isPenalties) {
        winnerTeam = homePenalty > awayPenalty ? finalMatch.home.id : finalMatch.away.id;
      } else {
        winnerTeam = homeScore > awayScore ? finalMatch.home.id : finalMatch.away.id;
      }
    } catch (err) {
      this.logger.error(`Erreur lors du calcul du winnerTeam: ${err.message}`);
      throw err;
    }

    // Meilleur buteur
    const topScorerArr = await this.playerRepository.players.find({
      order: { buts: 'DESC' },
      take: 1,
    }).catch(err => {
      this.logger.error(`Erreur lors de la recherche du topScorer: ${err.message}`);
      return [];
    });
    const topScorer = topScorerArr[0] || null;

    // Meilleur passeur
    const topAssistArr = await this.playerRepository.players.find({
      order: { passes: 'DESC' },
      take: 1,
    }).catch(err => {
      this.logger.error(`Erreur lors de la recherche du topAssist: ${err.message}`);
      return [];
    });
    const topAssist = topAssistArr[0] || null;

    let processedCount = 0;
    let winnersCount = 0;
    let losersCount = 0;
    let paidCount = 0;

    for (const coupon of pendingCoupons) {
      try {
        let isWinner = false;
        
        await this.dataSource.transaction(
          async (manager) => {
            // ✅ ÉTAPE 1 : Verrouiller le coupon SANS relation (évite l'erreur TypeORM/Postgres avec FOR UPDATE et les Joins)
            const lockedCoupon = await manager.findOne(TournoiCouponEntity, {
              where: { id: coupon.id },
              lock: { mode: 'pessimistic_write' },
            });

            if (!lockedCoupon || lockedCoupon.isPaid || lockedCoupon.etat !== TournoiCouponState.PENDING) {
              return;
            }

            // ✅ ÉTAPE 2 : Charger les relations séparément via le manager
            const couponWithBets = await manager.findOne(TournoiCouponEntity, {
              where: { id: coupon.id },
              relations: {
                tournoiCouponBets: { bet: true },
                user: true,
              },
            });

            if (!couponWithBets) return;

            let hasLost = false;
            let hasPending = false;

            for (const couponBet of couponWithBets.tournoiCouponBets) {
              const bet = couponBet.bet;
              
              // Sécurité sur les options sélectionnées
              if (!couponBet.selectedOptions || Object.keys(couponBet.selectedOptions).length === 0) {
                hasPending = true;
                continue;
              }

              const selected = Object.keys(couponBet.selectedOptions)[0];
              let resultValue: string | null = null;

              switch (bet.category) {
                case CategoryName.COMPETITION_WINNER:
                  resultValue = winnerTeam;
                  break;

                case CategoryName.COMPETITION_TOP_SCORER:
                  resultValue = topScorer?.id;
                  break;

                case CategoryName.COMPETITION_TOP_ASSIST:
                  resultValue = topAssist?.id;
                  break;
              }

              if (!resultValue) {
                hasPending = true;
                continue;
              }

              if (selected === resultValue) {
                couponBet.status = BetStatus.GAGNE;
              } else {
                couponBet.status = BetStatus.PERDU;
                hasLost = true;
              }

              await manager.save(couponBet);
            }

            if (hasLost) {
              lockedCoupon.etat = TournoiCouponState.LOOSE;
              await manager.save(lockedCoupon);
              losersCount++;

              this.tournoiCouponGateway.server?.emit('couponStatusUpdated', {
                couponId: lockedCoupon.id,
                userId: coupon.user?.id,
                newState: TournoiCouponState.LOOSE,
                gains: lockedCoupon.gains,
                timestamp: new Date()
              });
              this.logger.log(`📉 Coupon ${lockedCoupon.id} marqué comme PERDU`);
            } 
            else if (!hasPending) {
              lockedCoupon.etat = TournoiCouponState.WIN;
              await manager.save(lockedCoupon);
              winnersCount++;
              isWinner = true;

              this.tournoiCouponGateway.server?.emit('couponStatusUpdated', {
                couponId: lockedCoupon.id,
                userId: coupon.user?.id,
                newState: TournoiCouponState.WIN,
                gains: lockedCoupon.gains,
                timestamp: new Date()
              });
              this.logger.log(`🏆 Coupon ${lockedCoupon.id} marqué comme GAGNÉ`);
            }
            
            processedCount++;
          },
        );

        // Payer le coupon si gagnant
        if (isWinner) {
          await this.payoutUser(coupon);
          paidCount++;
        }
      } catch (error) {
        this.logger.error(`Erreur lors du traitement du coupon ${coupon.id}: ${error.message}`);
        // On continue avec le suivant au lieu de faire échouer toute la requête
      }
    }

    return {
      success: true,
      message: `${processedCount} coupons traités, ${winnersCount} gagnants, ${losersCount} perdants, ${paidCount} payés`,
      processedCount,
      winnersCount,
      losersCount,
      paidCount,
    };
  }


  private async payoutUser(coupon: TournoiCoupon): Promise<void> {
    try {
      await this.dataSource.transaction(async (manager) => {
        
        // ✅ ÉTAPE 1 : Verrouiller le coupon SANS relation (évite le LEFT JOIN + FOR UPDATE)
        const lockedCoupon = await manager.findOne(TournoiCouponEntity, {
          where: { id: coupon.id },
          lock: { mode: 'pessimistic_write' },
          // ← Pas de relations ici !
        });

        if (!lockedCoupon) throw new Error('Coupon introuvable');
        if (lockedCoupon.isPaid) {
          this.logger.warn(`Coupon déjà payé`);
          return;
        }

        // ✅ ÉTAPE 2 : Vérifier que le coupon est bien gagnant
        if (lockedCoupon.etat !== TournoiCouponState.WIN) {
          this.logger.warn(`Coupon non gagnant, état actuel: ${lockedCoupon.etat}`);
          return;
        }

        // ✅ ÉTAPE 3 : Récupérer l'ID utilisateur
        const userId = lockedCoupon.user?.id ?? coupon.user?.id;
        if (!userId) throw new Error('userId introuvable sur le coupon');

        // ✅ ÉTAPE 4 : Verrouiller l'utilisateur séparément
        const user = await manager.findOne(UserEntity, {
          where: { id: userId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!user) throw new Error('Utilisateur non trouvé');

        // ✅ ÉTAPE 5 : Effectuer le paiement
        const gains = lockedCoupon.gains || 0;
        user.solde += gains;
        lockedCoupon.isPaid = true;

        await manager.save(user);
        await manager.save(lockedCoupon);

        this.tournoiCouponGateway.server?.emit('userPaid', {
          userId: user.id,
          couponId: lockedCoupon.id,
          amount: gains,
          timestamp: new Date(),
        });

        this.logger.log(`✅ Paiement de ${gains} FCFA à l'utilisateur ${user.id} pour le coupon ${lockedCoupon.id}`);
      });
    } catch (error) {
      this.logger.error(`❌ Erreur lors du paiement: ${error.message}`);
      throw error;
    }
  }
}
