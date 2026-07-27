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
import { DataSource } from 'typeorm';
import { CouponEntity } from '../../../coupon/framework/schema/coupon.entity';
import { UserEntity } from '../../../user/framework/database/schema/user.entity';
import { CouponBetEntity } from '../../../couponBet/framework/schema/coupon_bet.entity';
import { IUpdateMatchDTO } from '../../../match/app/dto';

// Limite maximale des gains pour éviter les calculs aberrants
const MAX_GAINS = 10_000_000;

@Injectable()
export class CouponService {
  private readonly logger = new Logger(CouponService.name);

  constructor(
    private couponsRepository: ICouponRepository,
    private userRepository: IUserRepository,
    private betRepository: IBetRepository,
    private cpRepository: ICouponBetRepository,
    private dataSource: DataSource,
  ) { }

  // Récupérer tous les coupons avec relations
  async fetchAll(): Promise<Coupon[]> {
    return await this.couponsRepository.coupons.find({
      relations: {
        user: true,
        couponBets: {
          bet: { match: { home: { joueurs: true }, away: { joueurs: true } } },
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

  /* ================= SEARCH ================= */
  async search(data: Partial<Coupon>): Promise<Coupon> {
    return await this.couponsRepository.coupons.findOneBy(data);
  }

  // Ajouter un coupon avec ses CouponBets (TRANSACTIONNEL)
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

      // Vérification null/undefined pour selectedOptions
      if (!cp.selectedOptions || Object.keys(cp.selectedOptions).length === 0) {
        throw new BadRequestException('selectedOptions est requis pour chaque bet');
      }

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

    // Vérification des gains maximums pour éviter les calculs aberrants
    if (gains > MAX_GAINS) {
      throw new BadRequestException(`Gains potentiels trop élevés (max: ${MAX_GAINS} FCFA)`);
    }

    // this.logger.log(`📝 Création coupon: user=${user}, mise=${amount}, totalOdds=${totalOdds.toFixed(2)}, gains=${gains.toFixed(2)}`);

    // TRANSACTION SÉCURISÉE: Débit + Création coupon + Création bets
    return await this.dataSource.transaction(async (manager) => {
      // Verrouiller l'utilisateur pour éviter les races
      const lockedUser = await manager.findOne(UserEntity, {
        where: { id: userExisted.id },
        lock: { mode: 'pessimistic_write' },
      });

      if (!lockedUser) throw new NotFoundException('Utilisateur non trouvé');

      // Re-vérifier le solde après verrouillage
      if (amount > lockedUser.solde) {
        throw new BadRequestException('Solde insuffisant');
      }

      // Débiter le solde utilisateur
      lockedUser.solde -= amount;
      await manager.save(lockedUser);

      // this.logger.log(`💰 Débit de ${amount} FCFA pour l'utilisateur ${lockedUser.id} (nouveau solde: ${lockedUser.solde})`);

      // Création du coupon
      const couponData = await CouponFactory.create({ ...data, totalOdds, gains }, lockedUser);
      const couponEntity = await manager.save(CouponEntity, couponData as any);

      // this.logger.log(`✅ Coupon ${couponEntity.id} créé avec succès`);

      // Création des CouponBets
      for (const cp of betsEntities) {
        cp.coupon = couponEntity;
        await manager.save(CouponBetEntity, cp as any);
      }
      return couponEntity;
    });
  }

  // Modifier un coupon
  async edit(data: UpdateCouponDTO): Promise<Coupon> {
    const coupon = await this.couponsRepository.coupons.findOne({
      where: { id: data.id },
      relations: { user: true, couponBets: true },
    });
    if (!coupon) throw new NotFoundException();

    this.logger.log(`📝 Modification coupon ${data.id}`);

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

  /* ================= SET STATE ================= */
  async setState(id: string): Promise<boolean> {
    const coupon = await this.couponsRepository.coupons.findOne({
      where: { id },
    });
    if (!coupon) {
      this.logger.warn(`setState: Coupon ${id} non trouvé`);
      return false;
    }

    this.logger.log(`🔄 setState appelé pour coupon ${id}, état actuel: ${coupon.etat}`);
    return false;
  }

  /* ================= REMOVE (Soft Delete) ================= */
  async remove(id: string): Promise<boolean> {
    const coupon = await this.couponsRepository.coupons.findOne({
      where: { id },
      relations: { couponBets: true },
    });
    if (!coupon) {
      this.logger.warn(`remove: Coupon ${id} non trouvé`);
      return false;
    }

    // Soft delete au lieu de suppression physique
    coupon.isDeleted = true;
    await this.couponsRepository.coupons.update(coupon);

    this.logger.log(`🗑️ Coupon ${id} marqué comme supprimé (soft delete)`);
    return true;
  }

  /* ================= CHECK COUPONS ================= */
  async checkCoupons(data: IUpdateMatchDTO): Promise<any> {
    this.logger.log(`🔍 Vérification des coupons pour le match ${data?.id ?? 'N/A'}`);

    const pendingCoupons = await this.couponsRepository.coupons.find({
      where: { etat: CouponState.PENDING },
      relations: {
        couponBets: { bet: { match: true } },
        user: true,
      },
    });

    if (!pendingCoupons || pendingCoupons.length === 0) {
      this.logger.log('Aucun coupon en attente à vérifier');
      return { success: true, message: 'Aucun coupon en attente', processedCount: 0 };
    }

    let processedCount = 0;
    let winnersCount = 0;
    let losersCount = 0;
    let paidCount = 0;

    for (const coupon of pendingCoupons) {
      try {
        let isWinner = false;

        await this.dataSource.transaction(async (manager) => {
          // Verrouiller le coupon
          const lockedCoupon = await manager.findOne(CouponEntity, {
            where: { id: coupon.id },
            lock: { mode: 'pessimistic_write' },
          });

          if (!lockedCoupon || lockedCoupon.isPaid || lockedCoupon.etat !== CouponState.PENDING) {
            return;
          }

          // Charger les relations séparément
          const couponWithBets = await manager.findOne(CouponEntity, {
            where: { id: coupon.id },
            relations: {
              couponBets: { bet: { match: true } },
              user: true,
            },
          });

          if (!couponWithBets) return;

          let hasLost = false;
          let hasPending = false;

          for (const couponBet of couponWithBets.couponBets) {
            const bet = couponBet.bet;

            // Sécurité sur les options sélectionnées
            if (!couponBet.selectedOptions || Object.keys(couponBet.selectedOptions).length === 0) {
              hasPending = true;
              continue;
            }

            // Skip les bets dont le match n'est pas terminé
            if (!bet?.match) {
              hasPending = true;
              continue;
            }

            // La logique de vérification sera étendue selon les catégories de bet
            // Pour l'instant, on marque comme pending si pas de résultat
            hasPending = true;

            await manager.save(couponBet);
          }

          if (hasLost) {
            lockedCoupon.etat = CouponState.LOOSE;
            await manager.save(lockedCoupon);
            losersCount++;
            this.logger.log(`📉 Coupon ${lockedCoupon.id} marqué comme PERDU`);
          } else if (!hasPending) {
            lockedCoupon.etat = CouponState.WIN;
            await manager.save(lockedCoupon);
            winnersCount++;
            isWinner = true;
            this.logger.log(`🏆 Coupon ${lockedCoupon.id} marqué comme GAGNÉ`);
          }

          processedCount++;
        });

        // Payer le coupon si gagnant
        if (isWinner) {
          await this.payoutUser(coupon);
          paidCount++;
        }
      } catch (error) {
        this.logger.error(`❌ Erreur lors du traitement du coupon ${coupon.id}: ${error.message}`);
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

  /* ================= VALIDATE PENDING COUPONS ================= */
  async validatePendingCoupons(): Promise<any> {
    this.logger.log('🔍 Validation des coupons en attente...');
    return await this.checkCoupons(null);
  }

  /* ================= PAYOUT (privé) ================= */
  private async payoutUser(coupon: Coupon): Promise<void> {
    try {
      await this.dataSource.transaction(async (manager) => {
        // Verrouiller le coupon
        const lockedCoupon = await manager.findOne(CouponEntity, {
          where: { id: coupon.id },
          lock: { mode: 'pessimistic_write' },
        });

        if (!lockedCoupon) throw new Error('Coupon introuvable');
        if (lockedCoupon.isPaid) {
          this.logger.warn(`⚠️ Coupon ${coupon.id} déjà payé`);
          return;
        }

        if (lockedCoupon.etat !== CouponState.WIN) {
          this.logger.warn(`⚠️ Coupon ${coupon.id} non gagnant, état: ${lockedCoupon.etat}`);
          return;
        }

        // Récupérer l'ID utilisateur
        const userId = lockedCoupon.user?.id ?? coupon.user?.id;
        if (!userId) throw new Error('userId introuvable sur le coupon');

        // Verrouiller l'utilisateur
        const user = await manager.findOne(UserEntity, {
          where: { id: userId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!user) throw new Error('Utilisateur non trouvé');

        // Effectuer le paiement
        const gains = lockedCoupon.gains || 0;
        user.solde += gains;
        lockedCoupon.isPaid = true;

        await manager.save(user);
        await manager.save(lockedCoupon);

        this.logger.log(`✅ Paiement de ${gains} FCFA à l'utilisateur ${user.id} pour le coupon ${lockedCoupon.id}`);
      });
    } catch (error) {
      this.logger.error(`❌ Erreur lors du paiement du coupon ${coupon.id}: ${error.message}`);
      throw error;
    }
  }
}
