import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PayoutProcessor } from './payout.processor';
import { PayoutService } from './payout.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payout-queue',
    }),
  ],
  providers: [PayoutProcessor, PayoutService],
  exports: [PayoutService],
})
export class PayoutModule {}