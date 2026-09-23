import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccountGuard } from './account.guard';
import { AccountRepositoryModule } from '../../framework/database/account.repository.module';

/**
 * Module global qui fournit AccountGuard à toute l'application.
 * En étant @Global(), il n'est pas nécessaire de l'importer dans chaque module
 * qui utilise @UseGuards(AccountGuard) — il suffit de l'importer une fois dans AppModule.
 */
@Global()
@Module({
  imports: [
    AccountRepositoryModule,
    JwtModule.register({}), // JwtService disponible pour AccountGuard (secret lu dynamiquement via process.env)
  ],
  providers: [AccountGuard],
  exports: [AccountGuard, AccountRepositoryModule],
})
export class AccountGuardModule {}
