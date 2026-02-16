import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CouponBetAccountDto, UpdateCouponBetDTO } from '../dto';
import { CouponBetFactory } from '../coupon_bet.factory';
import { IBetRepository } from 'src/bet/domain/data.abstract';
import { BetStatus, CouponBet } from 'src/couponBet/domain';
import { ICouponBetRepository } from 'src/couponBet/domain/data.abstract';
import { ICouponRepository } from 'src/coupon/domain/data.abstract';
import { ICouponBetService } from 'src/couponBet/app/module';
import { IMatchRepository } from 'src/match/domain';

@Injectable()
export class CouponBetService implements ICouponBetService {
  private readonly logger = new Logger();
  constructor(
    private couponBetsRepository: ICouponBetRepository,
    private couponRepository: ICouponRepository,
    private matchRepository: IMatchRepository,
    private betRepository: IBetRepository,
  ) {}

  
  setState(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async fetchAll(): Promise<CouponBet[]> {
    return this.couponBetsRepository.couponBets.find({
      relations: { bet: true, coupon: true },
    });
  }

  async fetchOne(id: string): Promise<CouponBet> {
    const couponBet = await this.couponBetsRepository.couponBets.findOne({
      where: { id },
      relations: { bet: true, coupon: true },
    });

    if (!couponBet) {
      throw new NotFoundException('CouponBet non trouvé');
    }
    return couponBet;
  }

  async search(data: Partial<CouponBet>): Promise<CouponBet> {
    return this.couponBetsRepository.couponBets.findOneBy(data);
  }

  /* ================= ADD ================= */

  async add(data: CouponBetAccountDto): Promise<CouponBet> {
    try {
      const { bet: betId, coupon: couponId, selectedOptions } = data;

      const bet = await this.betRepository.bets.findOneByID(betId);
      if (!bet) throw new NotFoundException('Bet non trouvé');

      const coupon = await this.couponRepository.coupons.findOneByID(couponId);
      if (!coupon) throw new NotFoundException('Coupon non trouvé');

      /* ✅ Validation bookmaker */
      this.validateSelectedOptions(bet.odds, selectedOptions);

      return await this.couponBetsRepository.couponBets.create(
        CouponBetFactory.create(
          bet,
          coupon,
          selectedOptions,
        ),
      );
    } catch (error) {
      this.logger.error(error.message, 'ERROR::CouponBetService.add');
      throw error;
    }
  }

  /* ================= EDIT (STATUS ONLY) ================= */

  async edit(data: UpdateCouponBetDTO): Promise<CouponBet> {
    try {
      const { id, status } = data;

      const couponBet = await this.couponBetsRepository.couponBets.findOne({
        where: { id },
        relations: { bet: true, coupon: true },
      });

      if (!couponBet) {
        throw new NotFoundException('CouponBet non trouvé');
      }

      if (couponBet.status !== BetStatus.PENDING) {
        throw new ConflictException('Ce pari est déjà clôturé');
      }

      return await this.couponBetsRepository.couponBets.update(
        CouponBetFactory.updateStatus(couponBet, status),
      );
    } catch (error) {
      this.logger.error(error.message, 'ERROR::CouponBetService.edit');
      throw error;
    }
  }

  /* ================= REMOVE ================= */

  async remove(id: string): Promise<boolean> {
    const couponBet = await this.couponBetsRepository.couponBets.findOne({
      where: { id },
    });

    if (!couponBet) return false;

    await this.couponBetsRepository.couponBets.remove(couponBet);
    return true;
  }

  /* ================= VALIDATION ================= */

  private validateSelectedOptions(
    betOdds: Record<string, number>,
    selected: Record<string, number>,
  ) {
    if (!selected || Object.keys(selected).length === 0) {
      throw new BadRequestException('Aucune option sélectionnée');
    }

    for (const [key, odd] of Object.entries(selected)) {
      if (!(key in betOdds)) {
        throw new BadRequestException(`Option ${key} invalide pour ce bet`);
      }

      if (betOdds[key] !== odd) {
        throw new BadRequestException(
          `Cote incorrecte pour ${key} (attendu ${betOdds[key]})`,
        );
      }
    }
  }

  // Récupérer tous les coupons avec relations
  async getPendingCouponBet(): Promise<CouponBet[]> {
    return await this.couponBetsRepository.couponBets.find({
      where: { status: BetStatus.PENDING },
      relations: {
        bet: { match: true },
      },
      order: { createdAt: 'DESC' },
    });
  }

  // Récupérer tous les coupons en attente pour un match spécifique
  async getMatchPendingCouponBet(matchId: string): Promise<CouponBet[]> {
    try {
      // Vérifier si le match existe
      const match = await this.matchRepository.matchs.findOne({
        where: { id: matchId },
      });
      
      if (!match) {
        throw new NotFoundException('Match non trouvé');
      }

      // Récupérer les coupons en attente pour ce match
      const coupons = await this.couponBetsRepository.couponBets.find({
        where: {
          status: BetStatus.PENDING,
          bet: {
            match: { id: matchId }
          }
        },
        relations: { 
          bet: { 
            match: { 
              home: true, 
              away: true,
              events: { joueur: true, equipe: true }  // Pour MATCH_GOAL_SCORER
            } 
          }, 
          coupon: { 
            user: true,
            couponBets: true  // Pour updateCouponStatus
          } 
        },
        order: { createdAt: 'DESC' },
      });

      return coupons;
      
    } catch (error) {
      // Log l'erreur pour le débogage
      this.logger.error(
        `Erreur lors de la récupération des coupons en attente pour le match ${matchId}: ${error.message}`,
        error.stack
      );
      
      // Relancer l'erreur ou retourner un tableau vide selon votre logique métier
      throw error;
    }
  }
}
