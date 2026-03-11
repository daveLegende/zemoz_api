import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CouponEntity } from '../coupon/framework/schema/coupon.entity';
import { CouponState } from '../coupon/domain';
import { UserEntity } from '../user/framework/database/schema/user.entity';

@Injectable()
export class PayoutService {
  private readonly logger = new Logger(PayoutService.name);

  constructor(private readonly dataSource: DataSource) {}

  async payoutUser(couponId: string): Promise<void> {
    try {
      await this.dataSource.transaction(async (manager) => {

        const lockedCoupon = await manager.findOne(CouponEntity, {
          where: { id: couponId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!lockedCoupon) throw new Error('Coupon introuvable');

        if (lockedCoupon.isPaid) {
          this.logger.warn(`Coupon ${couponId} déjà payé`);
          return;
        }

        const user = await manager.findOne(UserEntity, {
          where: { id: lockedCoupon.user?.id },
          lock: { mode: 'pessimistic_write' },
        });

        if (!user) throw new Error('Utilisateur introuvable');

        const gains = lockedCoupon.gains || 0;

        user.solde += gains;
        lockedCoupon.isPaid = true;
        lockedCoupon.etat = CouponState.WIN;

        await manager.save(user);
        await manager.save(lockedCoupon);

        this.logger.log(`💰 Paiement ${gains} FCFA au user ${user.id}`);

      });
    } catch (error) {
      this.logger.error(`❌ payout error: ${error.message}`);
      throw error;
    }
  }
}