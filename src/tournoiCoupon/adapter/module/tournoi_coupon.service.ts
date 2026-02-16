
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Coupon, CouponState } from 'src/coupon/domain';
import { TournoiCouponAccountDto, UpdateTournoiCouponDTO } from '../dto';
import { ICouponRepository } from 'src/coupon/domain/data.abstract';
import { IUserRepository } from 'user/domain';
import { TournoiCouponFactory } from '../tournoi_coupon.factory';
import { IBetRepository } from 'src/bet/domain/data.abstract';
import { ICouponBetRepository } from 'src/couponBet/domain/data.abstract';
import { BetStatus, CouponBet } from 'src/couponBet/domain';
import { CategoryName } from 'src/bet/domain';
import { TournoiCoupon, TournoiCouponState } from 'src/tournoiCoupon/domain';
import { ITournoiCouponRepository } from 'src/tournoiCoupon/domain/data.abstract';
import { ITournoiCouponBetRepository, TournoiCouponBet } from 'src/tournoiCouponBet/domain';
import { ITournoiCouponService } from 'src/tournoiCoupon/app/module';
import { IMatchRepository, MatchType } from 'src/match/domain';
import { IPlayerRepository } from 'src/player/domain';
import { TournoiCouponEntity } from 'src/tournoiCoupon/framework/schema/tournoi_coupon.entity';
import { DataSource } from 'typeorm';

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
  ) { }



  validatePendingCoupons(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  // Récupérer tous les coupons avec relations
  async fetchAll(): Promise<TournoiCoupon[]> {
    return await this.tournoiCouponsRepository.tournoiCoupons.find({
      relations: {
        user: true,
        tournoiCouponBets: {
          bet: { match: true },
        },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async fetchOne(id: string): Promise<TournoiCoupon> {
    const coupon = await this.tournoiCouponsRepository.tournoiCoupons.findOne({
      where: { id },
      relations: {
        user: true,
        tournoiCouponBets: { bet: { match: true } },
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
          bet: { match: true },
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

  async checkCoupons(): Promise<void> {
    const pendingCoupons = await this.tournoiCouponsRepository.tournoiCoupons.find({
      where: { etat: TournoiCouponState.PENDING },
      relations: {
        tournoiCouponBets: { bet: true },
        user: true,
      },
    });

    // WINNER
    const finalMatch = await this.matchRepository.matchs.findOne({
      where: { type: MatchType.FINALE },
      relations: { home: true, away: true },
    });

    if (!finalMatch) return;

    const winnerTeam =
      finalMatch.scores.home > finalMatch.scores.away
        ? finalMatch.home.id
        : finalMatch.away.id;

    // Meilleur buteur
    const topScorer = await this.playerRepository.players.findOne({
      order: { buts: 'DESC' },
    });

    // Meilleur passeur
    const topAssist = await this.playerRepository.players.findOne({
      order: { passes: 'DESC' },
    });

    for (const coupon of pendingCoupons) {
      await this.dataSource.transaction(
        async (manager) => {
          // Recharger le coupon avec verrouillage
          const lockedCoupon = await manager.findOne(TournoiCouponEntity, {
            where: { id: coupon.id },
            relations: {
              tournoiCouponBets: { bet: true },
              user: true,
            },
            lock: { mode: 'pessimistic_write' },
          });

          if (!lockedCoupon) return;

          //  Sécurité anti double paiement
          if (lockedCoupon.isPaid || lockedCoupon.etat !== TournoiCouponState.PENDING) {
            return;
          }

          let hasLost = false;
          let hasPending = false;

          for (const couponBet of lockedCoupon.tournoiCouponBets) {
            const bet = couponBet.bet;
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

            // Si résultat pas encore disponible → PENDING
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

          // Décision finale du coupon
          if (hasLost) {
            lockedCoupon.etat = TournoiCouponState.LOOSE;
          } 
          else if (!hasPending) {
            lockedCoupon.etat = TournoiCouponState.WIN;

            // Paiement unique garanti
            if (!lockedCoupon.isPaid) {
              lockedCoupon.user.solde += lockedCoupon.gains;
              lockedCoupon.isPaid = true;

              await manager.save(lockedCoupon.user);
            }
          }

          await manager.save(lockedCoupon);
        },
      );
    }
  }
}
