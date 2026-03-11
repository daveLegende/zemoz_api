// import { Processor, WorkerHost } from '@nestjs/bullmq';
// import { Job } from 'bullmq';
// import { PayoutService } from './payout.service';

// @Processor('payout-queue', {
//   concurrency: 5,
// })
// export class PayoutProcessor extends WorkerHost {

//   constructor(private readonly payoutService: PayoutService) {
//     super();
//   }

//   async process(job: Job) {

//     const { couponId } = job.data;

//     console.log('💰 Traitement payout coupon:', couponId);

//     await this.payoutService.payoutUser(couponId);
//   }
// }


import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PayoutService } from './payout.service';

@Processor('payout-queue', {
  concurrency: 5,
})
export class PayoutProcessor extends WorkerHost {
  private readonly logger = new Logger(PayoutProcessor.name);

  constructor(private readonly payoutService: PayoutService) {
    super();
  }

  async process(job: Job) {
    const { couponId } = job.data;

    this.logger.log(`🚀 Traitement payout coupon ${couponId}`);

    await this.payoutService.payoutUser(couponId);
  }
}