import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgotPassEntity } from './schema/fgp.entity';
import { IForgotPassRepository } from '../../../forgotpass/domain';
import { ForgotPassRepository } from './fgp.repository';


@Module({
  imports: [TypeOrmModule.forFeature([ForgotPassEntity])],
  providers: [
    {
      provide: IForgotPassRepository,
      useClass: ForgotPassRepository,
    },
  ],
  exports: [IForgotPassRepository],
})
export class ForgotPassRepositoryModule {}
