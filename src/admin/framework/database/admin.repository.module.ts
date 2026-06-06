import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IAdminRepository } from '../../domain';
import { AdminRepository } from './admin.repository';
import { AdminEntity } from './schema/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [
    {
      provide: IAdminRepository,
      useClass: AdminRepository,
    },
  ],
  exports: [IAdminRepository],
})
export class AdminRepositoryModule {}
