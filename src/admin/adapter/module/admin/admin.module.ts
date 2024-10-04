import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { IAdminService } from 'src/admin/app/module';
import { AdminController } from './admin.controller';
import { AdminRepositoryModule } from 'src/admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from 'src/admin/framework/API';

@Module({
  imports: [AdminRepositoryModule, AdminAuthApiModule], // Assure-toi d'importer AdminAuthApiModule
  controllers: [AdminController],
  providers: [{ provide: IAdminService, useClass: AdminService }],
  exports: [IAdminService, AdminRepositoryModule, AdminAuthApiModule], // Exporte uniquement ce qui a été importé
})
export class AdminModule {}
