import { Module } from '@nestjs/common';
import { ArbitreController } from './arbitre.controller';
import { IArbitreService } from '../../../arbitre/app/module';
import { ArbitreService } from './arbitre.service';
import { ArbitreRepositoryModule } from '../../../arbitre/framework/database/arbitre.repository.module';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { CloudinaryModule } from '../../../shared/infrastructure/cloudinary/cloudinary.module';

@Module({
  imports: [
    AdminRepositoryModule,
    AdminAuthApiModule,
    ArbitreRepositoryModule,
    CloudinaryModule,
  ],
  controllers: [ArbitreController],
  providers: [{ provide: IArbitreService, useClass: ArbitreService }],
  exports: [IArbitreService, ArbitreRepositoryModule],
})
export class ArbitreModule {}
