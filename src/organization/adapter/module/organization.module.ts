import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../framework/database/schema/organization.entity';
import { OrganizationMemberEntity } from '../../framework/database/schema/organization_member.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationGuard } from '../guard/organization.guard';
import { AdminModule } from '../../../admin/adapter/module/admin';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationEntity, OrganizationMemberEntity]),
    AdminModule,
  ],
  controllers: [OrganizationController],
  providers: [OrganizationGuard],
  exports: [OrganizationGuard],
})
export class OrganizationModule {}
