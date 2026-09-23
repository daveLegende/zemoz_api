import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { TournoiMemberEntity, TournoiRole } from '../../framework/database/schema/tournoi_member.entity';
import { PlatformRole } from '../../../account/domain/account.enum';
import { REQUIRE_ROLE_KEY, RequireRoleOptions } from '../../../account/adapter/guard/require-role.decorator';

@Injectable()
export class TournoiGuard implements CanActivate {
  constructor(
    private readonly dataSource: DataSource,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const account = request['account'] || request['user'] || request['admin'];

    if (!account) {
      throw new UnauthorizedException('Compte non authentifié');
    }

    // SUPER_ADMIN a accès total à tous les tournois
    if (account.platformRole === PlatformRole.SUPER_ADMIN) {
      return true;
    }

    const tournoiId =
      request.params?.tournoiId ||
      request.params?.id ||
      request.headers['x-tournoi-id'] ||
      request.query?.tournoiId ||
      request.body?.tournoiId;

    if (!tournoiId) {
      throw new ForbiddenException('Identifiant de tournoi requis');
    }

    const memberRepo = this.dataSource.getRepository(TournoiMemberEntity);
    const membership = await memberRepo.findOne({
      where: {
        account: { id: account.id },
        tournoi: { id: tournoiId },
      },
    });

    if (!membership) {
      throw new ForbiddenException('Accès refusé à ce tournoi');
    }

    const roleOptions = this.reflector.getAllAndOverride<RequireRoleOptions>(REQUIRE_ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roleOptions?.tournoiRole) {
      const requiredRoles = Array.isArray(roleOptions.tournoiRole)
        ? roleOptions.tournoiRole
        : [roleOptions.tournoiRole];

      if (membership.role !== TournoiRole.ADMIN && !requiredRoles.includes(membership.role)) {
        throw new ForbiddenException('Rôle insuffisant sur ce tournoi');
      }
    }

    request['tournoiMembership'] = membership;
    return true;
  }
}
