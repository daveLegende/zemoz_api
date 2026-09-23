import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { IAccountRepository } from '../../domain/data.abstract';
import { REQUIRE_ROLE_KEY, RequireRoleOptions } from './require-role.decorator';

export const _extractTokenFromHeader = (
  request: Request,
): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
};

@Injectable()
export class AccountGuard implements CanActivate {
  private readonly logger = new Logger(AccountGuard.name);

  constructor(
    private accountRepository: IAccountRepository,
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = _extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token manquant');
    }

    try {
      const decoded = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      const account = await this.accountRepository.accounts.findOneBy({ id: decoded.sub });

      if (!account || !account.isActivated) {
        throw new UnauthorizedException('Compte introuvable ou inactif');
      }

      request['account'] = account;
      // Compatibilité rétroactive pour le code existant s'appuyant sur request['user'] ou request['admin']
      request['user'] = account;
      request['admin'] = account;

      // Vérification des rôles plateforme si spécifiés
      const roleOptions = this.reflector.getAllAndOverride<RequireRoleOptions>(REQUIRE_ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (roleOptions?.platformRole) {
        const requiredRoles = Array.isArray(roleOptions.platformRole)
          ? roleOptions.platformRole
          : [roleOptions.platformRole];
        if (!requiredRoles.includes(account.platformRole)) {
          throw new ForbiddenException('Privilèges de plateforme insuffisants');
        }
      }

      return true;
    } catch (error) {
      this.logger.warn(`AccountAuth failed: ${error.message}`);
      if (error instanceof ForbiddenException) throw error;
      throw new UnauthorizedException(error.message);
    }
  }
}
