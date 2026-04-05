import { SetMetadata } from '@nestjs/common';
import { AccessEnum } from '../../../user/domain';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Public = () => SetMetadata('isPublic', true);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,
export const HasPermission = (p: AccessEnum) => SetMetadata('permission', p);
