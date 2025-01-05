import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { IAdminService } from 'src/admin/app/module';
import { AdminController } from './admin.controller';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';
import { UserModule } from 'user/adapter/module/user';
import { UserRepositoryModule } from 'user/framework/database/user.repository.module';

@Module({
  imports: [AdminRepositoryModule, AdminAuthApiModule, UserModule, UserRepositoryModule], // Assure-toi d'importer AdminAuthApiModule
  controllers: [AdminController],
  providers: [{ provide: IAdminService, useClass: AdminService }],
  exports: [IAdminService, AdminRepositoryModule, AdminAuthApiModule], // Exporte uniquement ce qui a été importé
})
export class AdminModule {}
