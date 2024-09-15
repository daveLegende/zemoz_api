import { Module } from '@nestjs/common';
import { IPouleService } from 'src/poule/app/module';
import { PouleService } from './poule.service';
import { PouleController } from './poule.controller';
import { PouleRepositoryModule } from 'src/poule/framework/database/poule.repository.module';
import { TeamRepositoryModule } from 'src/team/framework/database/team.repository.module';


@Module({
  imports: [PouleRepositoryModule, TeamRepositoryModule
    
  ],
  controllers: [PouleController],
  providers: [{ provide: IPouleService, useClass: PouleService }],
  exports: [IPouleService, PouleRepositoryModule],
})
export class PouleModule {}
