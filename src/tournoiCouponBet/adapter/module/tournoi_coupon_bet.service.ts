import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { TournoiCouponBetAccountDto, UpdateTournoiCouponBetDTO } from '../dto';
import { TournoiCouponBetFactory } from '../tournoi_coupon_bet.factory';
import { IBetRepository } from '../../../bet/domain/data.abstract';
import { BetStatus, CouponBet } from '../../../couponBet/domain';
import { ITournoiCouponBetService } from '../../app/module';
import { ITournoiCouponBetRepository, TournoiCouponBet } from '../../domain';
import { ITournoiCouponRepository } from '../../../tournoiCoupon/domain/data.abstract';
import { PaginationOptionsDto } from '../../../_shared/adapter/dto/pagination-options.dto';
import { PaginationResultDto } from '../../../_shared/adapter/dto/pagination-result.dto';

@Injectable()
export class TournoiCouponBetService implements ITournoiCouponBetService {
  private readonly logger = new Logger();
  constructor(
    private tournoiCouponBetsRepository: ITournoiCouponBetRepository,
    private tournoiCouponRepository: ITournoiCouponRepository,
    private betRepository: IBetRepository,
  ) { }


  setState(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async fetchAll(options: PaginationOptionsDto): Promise<PaginationResultDto<TournoiCouponBet>> {
    const [couponBets, total] = await this.tournoiCouponBetsRepository.tournoiCouponBets.findAndCount({
      skip: options.skip,
      take: options.limit,
      relations: { bet: true, tournoiCoupon: true },
      order: { createdAt: 'DESC' }
    });
    return new PaginationResultDto(couponBets, total, options.page, options.limit);
  }

  async fetchOne(id: string): Promise<TournoiCouponBet> {
    const couponBet = await this.tournoiCouponBetsRepository.tournoiCouponBets.findOne({
      where: { id },
      relations: { bet: true, tournoiCoupon: true },
    });

    if (!couponBet) {
      throw new NotFoundException('Tournoi CouponBet non trouvé');
    }
    return couponBet;
  }

  async search(data: Partial<TournoiCouponBet>): Promise<TournoiCouponBet> {
    return this.tournoiCouponBetsRepository.tournoiCouponBets.findOneBy(data);
  }

  /* ================= ADD ================= */

  async add(data: TournoiCouponBetAccountDto): Promise<TournoiCouponBet> {
    try {
      const { bet: betId, tournoiCoupon: couponId, selectedOptions } = data;

      const bet = await this.betRepository.bets.findOneByID(betId);
      if (!bet) throw new NotFoundException('Bet non trouvé');

      const coupon = await this.tournoiCouponRepository.tournoiCoupons.findOneByID(couponId);
      if (!coupon) throw new NotFoundException('Coupon non trouvé');

      /* ✅ Validation bookmaker */
      this.validateSelectedOptions(bet.odds, selectedOptions);

      return await this.tournoiCouponBetsRepository.tournoiCouponBets.create(
        TournoiCouponBetFactory.create(
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

  async edit(data: UpdateTournoiCouponBetDTO): Promise<TournoiCouponBet> {
    try {
      const { id, status } = data;

      const couponBet = await this.tournoiCouponBetsRepository.tournoiCouponBets.findOne({
        where: { id },
        relations: { bet: true, tournoiCoupon: true },
      });

      if (!couponBet) {
        throw new NotFoundException('Tournoi CouponBet non trouvé');
      }

      if (couponBet.status !== BetStatus.PENDING) {
        throw new ConflictException('Ce pari est déjà clôturé');
      }

      return await this.tournoiCouponBetsRepository.tournoiCouponBets.update(
        TournoiCouponBetFactory.updateStatus(couponBet, status),
      );
    } catch (error) {
      this.logger.error(error.message, 'ERROR::CouponBetService.edit');
      throw error;
    }
  }

  /* ================= REMOVE ================= */

  async remove(id: string): Promise<boolean> {
    const couponBet = await this.tournoiCouponBetsRepository.tournoiCouponBets.findOne({
      where: { id },
    });

    if (!couponBet) return false;

    await this.tournoiCouponBetsRepository.tournoiCouponBets.remove(couponBet);
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

  // Récupérer tous les coupons tournoi avec relations
  async getPendingTournoiCouponBet(): Promise<TournoiCouponBet[]> {
    return await this.tournoiCouponBetsRepository.tournoiCouponBets.find({
      where: { status: BetStatus.PENDING },
      relations: {
        bet: { match: true },
      },
      order: { createdAt: 'DESC' },
    });
  }
}
