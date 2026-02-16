import {
  BadRequestException,
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
  } from '@nestjs/common';
import { IAdminService } from 'src/admin/app/module';
import { Admin, IAdminRepository } from 'src/admin/domain';
import { AdminFactory } from '../../admin.factory';
import { AdminAccountDto, UpdateAdminDTO } from '../../dto';
import { ICouponRepository } from 'src/coupon/domain/data.abstract';
import { ITournoiCouponRepository } from 'src/tournoiCoupon/domain/data.abstract';
import { ITransactionRepository, TransactionType } from 'src/transactions/domain';
import { Coupon, CouponState } from 'src/coupon/domain';
import { TournoiCoupon, TournoiCouponState } from 'src/tournoiCoupon/domain';
  
@Injectable()
export class AdminService implements IAdminService {
  private readonly logger = new Logger();
  constructor(
    private adminRepository: IAdminRepository,
    private transactionRepository: ITransactionRepository,
    private couponRepository: ICouponRepository,
    private tournoicouponRepository: ITournoiCouponRepository,
  ) {}

  async fetchAll(): Promise<Admin[]> {
    try {
      return await this.adminRepository.admins.find();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.fetchAll');
      throw error;
    }
  }

  async fetchOne(id: string): Promise<Admin> {
    try {
      const admin = await this.adminRepository.admins.findOneByID(id);
      if (admin) {
        return admin;
      }
      throw new NotFoundException('Admin not found');
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.fetchOne');
      throw error;
    }
  }

  async search(data: Partial<Admin>): Promise<Admin> {
    // const Admin = new Admin()
    return await this.adminRepository.admins.findOneBy({ ...data });
  }

  async add(data: AdminAccountDto): Promise<Admin> {
    try {
      const { nom, password, email } = data;
      if(!nom || password || email) throw new BadRequestException("Invalid credentials");
      const existed = await this.adminRepository.admins.findOneBy({ email });
      if (existed)
        throw new ConflictException('Admin already exist');

      return await this.adminRepository.admins.create(
        await AdminFactory.create(data),
      );
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.add');
      throw error;
    }
  }

  async edit(data: UpdateAdminDTO): Promise<Admin> {
    try {
      const { id } = data;
      const admin = id && (await this.adminRepository.admins.findOneByID(id));
      if (admin) {
        return await this.adminRepository.admins.update(
          AdminFactory.update(admin, data),
        );
      }
      throw new NotFoundException();
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.editAdmin');

      throw error;
    }
  }

  async setState(id: string): Promise<boolean> {
    return false;
  }

  async remove(id: string): Promise<boolean> {
    try {
      const admin = await this.adminRepository.admins.findOneByID(id);
      if (admin) {
        return await this.adminRepository.admins.remove(admin).then(() => true);
      }
      return false;
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.remove');
      return false;
    }
  }

  async getDepositsAndWithdrawalsReport(): Promise<{
    totalDeposits: number;
    totalWithdrawals: number;
    depositsCount: number;
    withdrawalsCount: number;
  }> {
    try {
      const transactions = await this.transactionRepository.transactions.find();

      const deposits = transactions.filter(
        (t) => t.type === TransactionType.DEPOT,
      );

      const withdrawals = transactions.filter(
        (t) => t.type === TransactionType.RETRAIT,
      );

      const totalDeposits = deposits.reduce(
        (sum, t) => sum + Number(t.amount),
        0,
      );

      const totalWithdrawals = withdrawals.reduce(
        (sum, t) => sum + Number(t.amount),
        0,
      );

      return {
        totalDeposits,
        totalWithdrawals: Math.abs(totalWithdrawals),
        depositsCount: deposits.length,
        withdrawalsCount: withdrawals.length,
      };
    } catch (error) {
      this.logger.error(
        error.message,
        'ERROR::AdminService.getDepositsAndWithdrawalsReport',
      );
      throw error;
    }
  }


  /**
   * RAPPORT 2: Gains et pertes sur les coupons
   * Gains = mises des coupons perdus
   * Pertes = gains payés aux clients (hors leur mise)
   */
  async getCouponsProfitLossReport(): Promise<{
    totalBetsAmount: number;
    totalGainsPaid: number;
    profit: number;
    lostBetsAmount: number;
    winBetsNetAmount: number;
    winCount: number;
    loseCount: number;
    pendingCount: number;
  }> {
    try {
      const coupons = await this.couponRepository.coupons.find();

      const winCoupons = coupons.filter(
        (c) => c.etat === CouponState.WIN && c.isPaid === true,
      );

      const loseCoupons = coupons.filter(
        (c) => c.etat === CouponState.LOOSE,
      );

      const pendingCoupons = coupons.filter(
        (c) => c.etat === CouponState.PENDING,
      );

      const winMises = winCoupons.reduce(
        (sum, c) => sum + Number(c.amount),
        0,
      );

      const winGains = winCoupons.reduce(
        (sum, c) => sum + Number(c.gains),
        0,
      );

      const loseMises = loseCoupons.reduce(
        (sum, c) => sum + Number(c.amount),
        0,
      );

      const netLossFromWins = winGains - winMises;
      const gainsFromLosses = loseMises;

      return {
        totalBetsAmount: winMises + gainsFromLosses,
        totalGainsPaid: winGains,
        profit: gainsFromLosses - netLossFromWins,
        lostBetsAmount: gainsFromLosses,
        winBetsNetAmount: netLossFromWins,
        winCount: winCoupons.length,
        loseCount: loseCoupons.length,
        pendingCount: pendingCoupons.length,
      };
    } catch (error) {
      this.logger.error(
        error.message,
        'ERROR::AdminService.getCouponsProfitLossReport',
      );
      throw error;
    }
  }


  /**
   * RAPPORT 3: Gains et pertes sur les coupons tournoi
   */
  async getTournoiCouponsProfitLossReport(): Promise<{
    totalBetsAmount: number;
    totalGainsPaid: number;
    profit: number;
    lostBetsAmount: number;
    winBetsNetAmount: number;
    winCount: number;
    loseCount: number;
    pendingCount: number;
  }> {
    try {
      const tournoiCoupons = await this.tournoicouponRepository.tournoiCoupons.find();

      let winMises = 0;
      let winGains = 0;
      let loseMises = 0;
      let winCount = 0;
      let loseCount = 0;
      let pendingCount = 0;

      for (const c of tournoiCoupons) {
        const amount = Number(c.amount);
        const gains = Number(c.gains);

        if (c.etat === TournoiCouponState.WIN && c.isPaid) {
          winMises += amount;
          winGains += gains;
          winCount++;
        }

        if (c.etat === TournoiCouponState.LOOSE) {
          loseMises += amount;
          loseCount++;
        }

        if (c.etat === TournoiCouponState.PENDING) {
          pendingCount++;
        }
      }

      const netLossFromWins = winGains - winMises;
      const gainsFromLosses = loseMises;

      return {
        totalBetsAmount: winMises + gainsFromLosses,
        totalGainsPaid: winGains,
        profit: gainsFromLosses - netLossFromWins,
        lostBetsAmount: gainsFromLosses,
        winBetsNetAmount: netLossFromWins,
        winCount,
        loseCount,
        pendingCount,
      };
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.getTournoiCouponsProfitLossReport');
      throw error;
    }
  }


  /**
   * RAPPORT 4: Rapport combiné (coupons + tournoi coupons)
   */
  async getCombinedProfitLossReport(): Promise<{
    totalBetsAmount: number;
    totalGainsPaid: number;
    totalProfit: number;
    totalLostBetsAmount: number;
    totalWinBetsNetAmount: number;
    coupons: any;
    tournoiCoupons: any;
  }> {
    try {
      const couponsReport = await this.getCouponsProfitLossReport();
      const tournoiReport = await this.getTournoiCouponsProfitLossReport();

      return {
        totalBetsAmount: couponsReport.totalBetsAmount + tournoiReport.totalBetsAmount,
        totalGainsPaid: couponsReport.totalGainsPaid + tournoiReport.totalGainsPaid,
        totalProfit: couponsReport.profit + tournoiReport.profit,
        totalLostBetsAmount: couponsReport.lostBetsAmount + tournoiReport.lostBetsAmount,
        totalWinBetsNetAmount: couponsReport.winBetsNetAmount + tournoiReport.winBetsNetAmount,
        coupons: couponsReport,
        tournoiCoupons: tournoiReport,
      };
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.getCombinedProfitLossReport');
      throw error;
    }
  }

  /**
   * RAPPORT 5: Bénéfice net (dépôts - pertes sur les paris)
   * Bénéfice = Total des dépôts - (gains payés - mises)
   */
  async getNetProfitReport(): Promise<{
    totalDeposits: number;
    totalLossesOnBets: number;
    netProfit: number;
    details: {
      deposits: number;
      couponsLosses: number;
      tournoiCouponsLosses: number;
    };
  }> {
    try {
      // 1️⃣ Dépôts
      const transactions = await this.transactionRepository.transactions.find();

      let totalDeposits = 0;

      for (const t of transactions) {
        if (t.type === TransactionType.DEPOT) {
          totalDeposits += Number(t.amount);
        }
      }

      // 2️⃣ Coupons normaux (pertes)
      const coupons = await this.couponRepository.coupons.find();

      let totalCouponsLosses = 0;

      for (const c of coupons) {
        if (c.etat === CouponState.WIN && c.isPaid) {
          totalCouponsLosses += Number(c.gains) - Number(c.amount);
        }
      }

      // 3️⃣ Coupons tournoi (pertes)
      const tournoiCoupons = await this.tournoicouponRepository.tournoiCoupons.find();

      let totalTournoiLosses = 0;

      for (const c of tournoiCoupons) {
        if (c.etat === TournoiCouponState.WIN && c.isPaid) {
          totalTournoiLosses += Number(c.gains) - Number(c.amount);
        }
      }

      const totalLossesOnBets = totalCouponsLosses + totalTournoiLosses;
      const netProfit = totalDeposits - totalLossesOnBets;

      return {
        totalDeposits,
        totalLossesOnBets,
        netProfit,
        details: {
          deposits: totalDeposits,
          couponsLosses: totalCouponsLosses,
          tournoiCouponsLosses: totalTournoiLosses,
        },
      };
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.getNetProfitReport');
      throw error;
    }
  }


  /**
   * RAPPORT 6: Rapport complet avec tous les indicateurs
   */
  async getCompleteFinancialReport(): Promise<any> {
    try {
      const [
        depositsWithdrawals,
        couponsReport,
        tournoiReport,
        netProfit,
      ] = await Promise.all([
        this.getDepositsAndWithdrawalsReport(),
        this.getCouponsProfitLossReport(),
        this.getTournoiCouponsProfitLossReport(),
        this.getNetProfitReport(),
      ]);

      const totalBetsAmount =
        couponsReport.totalBetsAmount + tournoiReport.totalBetsAmount;

      const totalGainsPaid =
        couponsReport.totalGainsPaid + tournoiReport.totalGainsPaid;

      const totalProfit =
        couponsReport.profit + tournoiReport.profit;


      return {
        period: { from: "Début Tournoi", to: new Date().toISOString() },
        depositsWithdrawals,
        bettingActivity: {
          coupons: couponsReport,
          tournoiCoupons: tournoiReport,
          combined: {
            totalBetsAmount,
            totalGainsPaid,
            totalProfit,
          },
        },
        netProfit,
        summary: {
          totalDeposits: depositsWithdrawals.totalDeposits,
          totalWithdrawals: depositsWithdrawals.totalWithdrawals,
          netDeposits:
            depositsWithdrawals.totalDeposits -
            depositsWithdrawals.totalWithdrawals,
          totalBetsAmount,
          totalGainsPaid,
          netProfit: netProfit.netProfit,
        },
      };
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.getCompleteFinancialReport');
      throw error;
    }
  }

  async getAllCoupons(): Promise<Coupon[]> {
    try {
      const coupons = await this.couponRepository.coupons.find();

      // const pendingCoupons = coupons.filter(
      //   (t) => t.etat === CouponState.PENDING,
      // );

      // const lostCoupons = coupons.filter(
      //   (t) => t.etat === CouponState.LOOSE,
      // );

      return coupons;
    } catch (error) {
      this.logger.error(
        error.message,
        'ERROR::AdminService.getAllCoupons',
      );
      throw error;
    }
  }

  async getAllTournoiCoupons(): Promise<TournoiCoupon[]> {
    try {
      const tournoiCoupons = await this.tournoicouponRepository.tournoiCoupons.find();

      return tournoiCoupons;
    } catch (error) {
      this.logger.error(
        error.message,
        'ERROR::AdminService.getAllTournoiCoupons',
      );
      throw error;
    }
  }
}