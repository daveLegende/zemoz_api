import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { OrganizationMemberEntity, OrganizationRole } from '../../framework/database/schema/organization_member.entity';
import { PlatformRole } from '../../../account/domain/account.enum';
import { REQUIRE_ROLE_KEY, RequireRoleOptions } from '../../../account/adapter/guard/require-role.decorator';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(
    private readonly dataSource: DataSource,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const account = request['account'] || request['admin'] || request['user'];

    if (!account) {
      throw new UnauthorizedException('Compte non authentifié');
    }

    // SUPER_ADMIN a accès à tout
    if (account.platformRole === PlatformRole.SUPER_ADMIN) {
      return true;
    }

    const organizationId =
      request.params?.organizationId ||
      request.headers['x-organization-id'] ||
      request.query?.organizationId ||
      request.body?.organizationId;

    if (!organizationId) {
      throw new ForbiddenException("Identifiant d'organisation requis");
    }

    const memberRepo = this.dataSource.getRepository(OrganizationMemberEntity);
    const membership = await memberRepo.findOne({
      where: {
        account: { id: account.id },
        organization: { id: organizationId },
        isActive: true,
      },
    });

    if (!membership) {
      throw new ForbiddenException('Accès refusé à cette organisation');
    }

    const roleOptions = this.reflector.getAllAndOverride<RequireRoleOptions>(REQUIRE_ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (roleOptions?.organizationRole) {
      const requiredRoles = Array.isArray(roleOptions.organizationRole)
        ? roleOptions.organizationRole
        : [roleOptions.organizationRole];

      if (membership.role !== OrganizationRole.ADMIN && !requiredRoles.includes(membership.role)) {
        throw new ForbiddenException('Rôle insuffisant dans cette organisation');
      }
    }

    request['organizationMembership'] = membership;
    return true;
  }
}
