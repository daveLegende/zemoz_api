import { Module } from '@nestjs/common';
import { IPouleService } from '../../../poule/app/module';
import { PouleService } from './poule.service';
import { PouleController } from './poule.controller';
import { PouleRepositoryModule } from '../../../poule/framework/database/poule.repository.module';
import { TeamRepositoryModule } from '../../../team/framework/database/team.repository.module';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { AuthApiModule } from '../../../user/framework/API';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';

@Module({
  imports: [
    PouleRepositoryModule,
    TeamRepositoryModule,
    UserRepositoryModule,
    AuthApiModule,
    AdminRepositoryModule,
    AdminAuthApiModule,
  ],
  controllers: [PouleController],
  providers: [{ provide: IPouleService, useClass: PouleService }],
  exports: [IPouleService, PouleRepositoryModule],
})
export class PouleModule {}
