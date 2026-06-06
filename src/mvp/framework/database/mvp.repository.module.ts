import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IMVPRepository } from '../../../mvp/domain';
import { MVPEntity } from './schema/mvp.entity';
import { MvpRepository } from './mvp.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MVPEntity])],
  providers: [
    {
      provide: IMVPRepository,
      useClass: MvpRepository,
    },
  ],
  exports: [IMVPRepository],
})
export class MvpRepositoryModule {}
