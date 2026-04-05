import { Module } from '@nestjs/common';
import { MVPService } from './mvp.service';
import { MVPController } from './mvp.controller';
import { UserRepositoryModule } from '../../../user/framework/database/user.repository.module';
import { IMVPService } from '../../app/module';
import { PlayerRepositoryModule } from '../../../player/framework/database/player.repository.module';
import { MatchRepositoryModule } from '../../../match/framework/database/match.repository.module';
import { MvpRepositoryModule } from '../../framework/database/mvp.repository.module';
import { AdminAuthApiModule } from '../../../admin/framework/API';
import { AuthApiModule } from '../../../user/framework/API';
import { AdminRepositoryModule } from '../../../admin/framework/database/admin.repository.module';


@Module({
  imports: [
    MvpRepositoryModule,
    UserRepositoryModule,
    AdminRepositoryModule,
    AdminAuthApiModule,
    AuthApiModule,
    PlayerRepositoryModule,
    MatchRepositoryModule,
  ],
  controllers: [MVPController],
  providers: [MVPService, { provide: IMVPService, useClass: MVPService }],
  exports: [IMVPService, MvpRepositoryModule],
})
export class MVPModule { }
