import { Module } from '@nestjs/common';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { ITransactionService } from '../../../transactions/app/module';
import { TransactionRepositoryModule } from '../../../transactions/framework/database/transac.repository.module';
import { AuthApiModule } from '../../../user/framework/API';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { TransactionController } from './transac.controller';
import { TransactionService } from './transac.service';
import { PasswordModule } from '../../../password/password.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordEntity } from '../../../password/entity/pwd.entity';


@Module({
  imports: [
    TransactionRepositoryModule, 
    PasswordModule,
    TypeOrmModule.forFeature([PasswordEntity]),
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule, 
    AdminAuthApiModule,
  ],
  controllers: [TransactionController],
  providers: [{ provide: ITransactionService, useClass: TransactionService }],
  exports: [ITransactionService, TransactionRepositoryModule],
})
export class TransactionModule {}
