import { SetMetadata } from '@nestjs/common';
import { PlatformRole } from '../../domain/account.enum';
import { OrganizationRole } from '../../../organization/framework/database/schema/organization_member.entity';
import { TournoiRole } from '../../../tournoi/framework/database/schema/tournoi_member.entity';

export const REQUIRE_ROLE_KEY = 'require_role';

export interface RequireRoleOptions {
  platformRole?: PlatformRole | PlatformRole[];
  organizationRole?: OrganizationRole | OrganizationRole[];
  tournoiRole?: TournoiRole | TournoiRole[];
}

export const RequireRole = (options: RequireRoleOptions) => SetMetadata(REQUIRE_ROLE_KEY, options);
