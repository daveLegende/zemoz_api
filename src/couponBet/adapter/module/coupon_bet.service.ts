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

@Injectable()
export class CouponBetService implements ICouponBetService {
  private readonly logger = new Logger();
  constructor(
    private couponBetsRepository: ICouponBetRepository,
    private couponRepository: ICouponRepository,
    private betRepository: IBetRepository,
  ) {}

  async fetchAll(): Promise<CouponBet[]> {
    try {
      return await this.couponBetsRepository.couponBets.find({
        relations: { bet: true, coupon: true }
      });
    } catch (error) {
      this.logger.error(error.message, 'ERROR::couponsService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<CouponBet> {
    try {
      const coupons = await this.couponBetsRepository.couponBets.findOne({
        where: { id: id },
        relations: { bet: true, coupon: true }
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

  async search(data: Partial<CouponBet>): Promise<CouponBet> {
    return await this.couponBetsRepository.couponBets.findOneBy({ ...data });
  }

  async add(data: CouponBetAccountDto): Promise<CouponBet> {
    try {
      const { selectedOptions, bet, coupon } = data;

      const betExisted = await this.betRepository.bets.findOneByID(bet);
      if(!betExisted) throw new NotFoundException("Bet non trouvé");

      const couponExisted = await this.couponRepository.coupons.findOneByID(coupon);
      if(!couponExisted) throw new NotFoundException("Coupon non trouvé");

      const optionsSelected: Record<string, number> = {
        V1: selectedOptions.V1,
        V2: selectedOptions.V2,
        X: selectedOptions.X,
        OUI: selectedOptions.OUI,
        NON: selectedOptions.NON,
      };

      return await this.couponBetsRepository.couponBets.create(
        await CouponBetFactory.create(data, betExisted, couponExisted, optionsSelected),
      )
    } catch (error) {
      this.logger.error(error.message, 'ERROR::couponservice.add');
      throw error;
    }
  }

  async edit(data: UpdateCouponBetDTO): Promise<CouponBet> {
    try {
      const { id } = data;
      const coupons = id && (await this.couponBetsRepository.couponBets.findOne({
        where: { id: id },
        relations: { bet: true, coupon: true }
      }));
      if (coupons) {
        if (coupons.status === BetStatus.PENDING) {
          return await this.couponBetsRepository.couponBets.update(
            CouponBetFactory.update(coupons, data),
          );
        } 
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
      const coupons = await this.couponBetsRepository.couponBets.findOne({
        where: { id: id },
        relations: { bet: true, coupon: true }
      });
      if (coupons) {
        return await this.couponBetsRepository.couponBets.remove(coupons).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::couponservice.remove');
      return false;
    }
  }
}
