import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { OrganizationMemberEntity, OrganizationRole } from '../../framework/database/schema/organization_member.entity';
import { AdminEntity } from '../../../admin/framework/database/schema/admin.entity';

@Injectable()
export class OrganizationGuard implements CanActivate {
  constructor(private readonly dataSource: DataSource) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const admin: AdminEntity = request['admin'];

    if (!admin) {
      throw new UnauthorizedException('Admin non authentifié');
    }

    // SUPER_ADMIN a accès à tout
    if (admin.isSuperAdmin) {
      return true;
    }

    // Récupérer l'organizationId soit dans les params (/organizations/:organizationId),
    // soit dans les headers (x-organization-id) ou query
    const organizationId =
      request.params?.organizationId ||
      request.headers['x-organization-id'] ||
      request.query?.organizationId;

    if (!organizationId) {
      throw new ForbiddenException('Identifiant d\'organisation requis');
    }

    const memberRepo = this.dataSource.getRepository(OrganizationMemberEntity);
    const membership = await memberRepo.findOne({
      where: {
        admin: { id: admin.id },
        organization: { id: organizationId },
        isActive: true,
      },
    });

    if (!membership) {
      throw new ForbiddenException('Accès refusé à cette organisation');
    }

    // Attacher l'appartenance à la requête
    request['organizationMembership'] = membership;
    return true;
  }
}
