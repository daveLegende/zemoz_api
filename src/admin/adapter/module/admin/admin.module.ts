import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { IAdminService } from '../../../app/module';
import { AdminController } from './admin.controller';
import { AdminRepositoryModule } from '../../../framework/database/admin.repository.module';
import { AdminAuthApiModule } from '../../../framework/API';
import { UserModule } from '../../../../user/adapter/module/user';
import { UserRepositoryModule } from '../../../../user/framework/database/user.repository.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournoiCouponEntity } from '../../../../tournoiCoupon/framework/schema/tournoi_coupon.entity';
import { CouponEntity } from '../../../../coupon/framework/schema/coupon.entity';
import { TransactionEntity } from '../../../../transactions/framework/database/schema/transac.entity';
import { CouponModule } from '../../../../coupon/adapter/module';
import { TournoiCouponModule } from '../../../../tournoiCoupon/adapter/module';
import { TransactionModule } from '../../../../transactions/adapter/module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionEntity,
      CouponEntity,
      TournoiCouponEntity,
    ]),
    AdminRepositoryModule,
    AdminAuthApiModule,
    UserModule,
    UserRepositoryModule,
    TransactionModule,
    CouponModule,
    TournoiCouponModule,
  ], // Assure-toi d'importer AdminAuthApiModule
  controllers: [AdminController],
  providers: [{ provide: IAdminService, useClass: AdminService }],
  exports: [IAdminService, AdminRepositoryModule, AdminAuthApiModule], // Exporte uniquement ce qui a été importé
})
export class AdminModule {}
