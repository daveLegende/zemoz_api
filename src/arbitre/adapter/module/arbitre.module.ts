import { Module } from '@nestjs/common';
import { ArbitreController } from './arbitre.controller';
import { IArbitreService } from 'src/arbitre/app/module';
import { ArbitreService } from './arbitre.service';
import { ArbitreRepositoryModule } from 'src/arbitre/framework/database/arbitre.repository.module';


@Module({
  imports: [ArbitreRepositoryModule],
  controllers: [ArbitreController],
  providers: [{ provide: IArbitreService, useClass: ArbitreService }],
  exports: [IArbitreService, ArbitreRepositoryModule],
})
export class ArbitreModule {}
