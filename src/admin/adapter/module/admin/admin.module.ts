import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { IAdminService } from 'src/admin/app/module';
import { AdminController } from './admin.controller';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { UserModule } from 'user/adapter/module/user';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournoiCouponEntity } from 'src/tournoiCoupon/framework/schema/tournoi_coupon.entity';
import { CouponEntity } from 'src/coupon/framework/schema/coupon.entity';
import { TransactionEntity } from 'src/transactions/framework/database/schema/transac.entity';
import { CouponModule } from 'src/coupon/adapter/module';
import { TournoiCouponModule } from 'src/tournoiCoupon/adapter/module';
import { TransactionModule } from 'src/transactions/adapter/module';

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
